import links from '../../config/links'

export default async function handleOgimage(c) {
	const destination = c.req.query('url') || ''

	try {
		const { hostname } = new URL(destination)
		if (!hostname.endsWith(links.pub.domain))
			throw new Error()
	} catch(e) {
		return c.notFound()
	}

	const response = await fetch(`https://rdl.ink/render/${destination}?width=1200&height=628`)
	return new Response(response.body, {
		status: response.status,
		headers: {
			'Content-Type': response.headers.get('content-type') || 'image/png',
			'Cache-Control': 'public,max-age=3600'
		}
	})
}
