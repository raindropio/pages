import { handleSsr } from './ssr'
import { handleStaticAssets } from './static-assets'

addEventListener('fetch', (event) => {
	try {
		event.respondWith(
			handleFetchEvent(event).catch((err) => {
				console.error(err.stack)
			})
		)
	} catch (err) {
		console.error(err.stack)
		event.respondWith(new Response('Internal Error', { status: 500 }))
	}
})

async function handleFetchEvent(event) {
	if (!isAssetUrl(event.request.url)) {
		//check cached
		let response = await caches.default.match(event.request)

		if (!response) {
			response = await handleSsr(
				new URL(event.request.url).toString() //be sure to wrap it in URL(), otherwise some urls fail
			)

			//save to cache
			if (response && response.ok && response.headers.get('cache-control')) 
				event.waitUntil(caches.default.put(event.request, response.clone()))
		}

		if (response !== null) return response
	}
	
	const response = await handleStaticAssets(event)
	return response
}

function isAssetUrl(url) {
	const { pathname } = new URL(url)
	return pathname.startsWith('/__pages_assets__/')
}