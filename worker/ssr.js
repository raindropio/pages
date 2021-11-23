import { createPageRenderer } from 'vite-plugin-ssr'
// `importBuild.js` enables us to bundle our worker code into a single file, see https://vite-plugin-ssr.com/cloudflare-workers and https://vite-plugin-ssr.com/importBuild.js
import '../dist/server/importBuild.js'

const renderPage = createPageRenderer({ isProduction: true })

export async function handleSsr(url) {
	const { httpResponse, statusCode, redirect, json } = await renderPage({ url })

	if (redirect) {
		return Response.redirect(redirect, statusCode||302)
	} else if (json) {
		return new Response(JSON.stringify(json), {
			status: statusCode || 200
		})
	} else if (!httpResponse)
		return null
	else 
		return new Response(
			httpResponse.body, {
				headers: {
					'content-type': httpResponse.contentType
				},
				status: statusCode || httpResponse.statusCode,
			}
		)
}