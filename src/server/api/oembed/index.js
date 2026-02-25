import * as collection from './collection'
import * as user from './user'

const providers = [collection, user]

export default async function handleOembed(c) {
	const destination = c.req.query('url')

	let json

	for (const provider of providers) {
		let valid = false

		try { valid = provider.validateURL(destination) } catch(e) {}

		if (valid) {
			json = await provider.default(destination)
			break
		}
	}

	if (json)
		return c.json(json, 200, {
			'Cache-Control': 'public,max-age=3600'
		})

	return c.json({ error: 'Invalid URL' }, 400, {
		'Cache-Control': 'public,max-age=3600'
	})
}
