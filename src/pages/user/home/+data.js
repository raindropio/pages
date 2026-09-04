import Api, { FetchError } from '~api'
import { render } from 'vike/abort'

export async function data({ routeParams: { user_name }, runtime }) {
	const { signal } = runtime.hono.req.raw //abort API calls when the client disconnects
	var user, collections
	try {
		var [user, collections] = await Promise.all([
			Api.user.getByName(user_name, { signal }),
			Api.collections.getByUserName(user_name, { signal })
		])
	} catch(e) {
		if (e instanceof FetchError)
			throw render(e.status, e.message)

		throw e
	}

	if (!user || !collections?.length)
		throw render(404)

	return { user, collections }
}
