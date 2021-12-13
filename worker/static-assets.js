import { getAssetFromKV, NotFoundError } from '@cloudflare/kv-asset-handler'

const isProd = typeof STAGE == 'string' && STAGE == 'production'

export async function handleStaticAssets(event) {
	let options = {}

	try {
		options.cacheControl = {
			bypassCache: !isProd,
			browserTTL: 365 * 60 * 60 * 24, // 365 days
			edgeTTL: 365 * 60 * 60 * 24, // 365 days
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