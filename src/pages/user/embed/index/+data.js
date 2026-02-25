import Api from '~api'
import { parseQueryParams } from '~modules/format/url'
import { render } from 'vike/abort'

export async function data({ routeParams: { user_name, options } }) {
	options = parseQueryParams(options)

	const [user, collections] = await Promise.all([
		Api.user.getByName(user_name),
		Api.collections.getByUserName(user_name)
	])

	if (!user || !collections?.length)
		throw render(404)

	return { user, collections, options }
}
