import Api from '~api'
import { parseQueryParams } from '~modules/format/url'
import { render } from 'vike/abort'

export async function data({ routeParams: { user_name, options } }) {
	options = parseQueryParams(options)

	const user = await Api.user.getByName(user_name)

	if (!user)
		throw render(404)

	return { user, options }
}
