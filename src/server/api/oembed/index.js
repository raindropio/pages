import { FetchError } from '~api'
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
			try {
				json = await provider.default(destination, { signal: c.req.raw.signal })
			} catch (e) {
				if (e instanceof FetchError)
					return c.json({ error: e.message }, e.status)
				throw e
			}
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
