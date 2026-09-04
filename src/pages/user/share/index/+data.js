import Api from '~api'
import { parseQueryParams } from '~modules/format/url'
import { render } from 'vike/abort'

export async function data({ routeParams: { user_name, options }, runtime }) {
	const { signal } = runtime.hono.req.raw //abort API calls when the client disconnects
	options = parseQueryParams(options)

	const user = await Api.user.getByName(user_name, { signal })

	if (!user)
		throw render(404)

	return { user, options }
}
