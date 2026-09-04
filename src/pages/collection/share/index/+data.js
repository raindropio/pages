import Api from '~api'
import { parseQueryParams } from '~modules/format/url'
import { render } from 'vike/abort'

export async function data({ routeParams: { id, user_name, options }, runtime }) {
	const { signal } = runtime.hono.req.raw //abort API calls when the client disconnects
	options = parseQueryParams(options)

	const [collection, user] = await Promise.all([
		Api.collection.get(id, { signal }),
		Api.user.getByName(user_name, { signal })
	])

	if (!collection || !user)
		throw render(404)

	return { collection, user, options }
}
