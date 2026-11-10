import Api, { FetchError } from '~api'
import { parseQueryParams } from '~modules/format/url'
import { render } from 'vike/abort'

export async function data({ routeParams: { id, user_name, options }, runtime }) {
	const { signal } = runtime.hono.req.raw //abort API calls when the client disconnects
	options = parseQueryParams(options)

	var collection, user
	try {
		collection = await Api.collection.get(id, { signal })
		user = await Api.user.getByName(user_name, { signal })
	} catch(e) {
		if (e instanceof FetchError)
			throw render(e.status, e.message)

		throw e
	}

	if (!collection || !user)
		throw render(404)

	return { collection, user, options }
}
