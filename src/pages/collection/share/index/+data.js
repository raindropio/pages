import Api from '~api'
import { parseQueryParams } from '~modules/format/url'
import { render } from 'vike/abort'

export async function data({ routeParams: { id, user_name, options } }) {
	options = parseQueryParams(options)

	const [collection, user] = await Promise.all([
		Api.collection.get(id),
		Api.user.getByName(user_name)
	])

	if (!collection || !user)
		throw render(404)

	return { collection, user, options }
}
