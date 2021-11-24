import { getAssetFromKV, NotFoundError } from '@cloudflare/kv-asset-handler'

const isProd = typeof STAGE == 'string' && STAGE == 'production'

export async function handleStaticAssets(event) {
	let options = {}

	try {
		if (!isProd)
			options.cacheControl = {
				bypassCache: true,
			}

		return getAssetFromKV(event, options)
	} catch (e) {
		if (e instanceof NotFoundError)
			return new Response('Not found', { status: 500 })

		return new Response(
			isProd ? 'Server error' : e.message || e.toString(),
			{ status: 500 }
		)
	}
}