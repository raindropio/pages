import Api from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'
import { parseQueryParams } from '~modules/format/url'
import { render } from 'vike/abort'
import find from 'lodash-es/find'

export async function data({ routeParams: { id, user_name, options }, runtime }) {
	const { signal } = runtime.hono.req.raw //abort API calls when the client disconnects
	options = parseQueryParams(options)
	options.sort = options.sort || (options.search?.length ? 'score' : '-created')
	options.perpage = RAINDROPS_PER_PAGE

	const [collections, raindrops, user, filters = {}] = await Promise.all([
		Api.collections.getByUserName(user_name, { signal }),
		Api.raindrops.get(id, options, { signal }),
		Api.user.getByName(user_name, { signal }),
		(!options.page ? Api.filters.get(id, options, { signal }) : undefined)
	])

	const collection = find(collections, ['_id', parseInt(id)])

	if (!collection || !user)
		throw render(404)

	return { collection, collections, raindrops, filters, user, options }
}
