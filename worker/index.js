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
		const response = await handleSsr(
			new URL(event.request.url).toString() //be sure to wrap it in URL(), otherwise some urls fail
		)
		if (response !== null) return response
	}
	
	const response = await handleStaticAssets(event)
	return response
}

function isAssetUrl(url) {
	const { pathname } = new URL(url)
	return pathname.startsWith('/__pages_assets__/')
}