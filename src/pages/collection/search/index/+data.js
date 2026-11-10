import Api, { FetchError } from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'
import { parseQueryParams } from '~modules/format/url'
import { render } from 'vike/abort'
import find from 'lodash-es/find'
import pick from 'lodash-es/pick'

export async function data({ routeParams: { id, user_name, options }, runtime }) {
	const { signal } = runtime.hono.req.raw //abort API calls when the client disconnects
	options = pick(parseQueryParams(options), ['search', 'sort', 'page'])
	if (options.page < 0)
		throw render(404)
	if ('search' in options)
		options.search = String(options.search)
	options.sort = options.sort || (options.search?.length ? 'score' : '-created')
	options.perpage = RAINDROPS_PER_PAGE

	var user, collections
	try {
		user = await Api.user.getByName(user_name, { signal })
		collections = await Api.collections.getByUserName(user_name, { signal })
	} catch(e) {
		if (e instanceof FetchError)
			throw render(e.status, e.message)

		throw e
	}

	const collection = find(collections, ['_id', parseInt(id)])

	if (!collection || !user)
		throw render(404)

	const raindrops = await Api.raindrops.get(id, options, { signal })
	const filters = (!options.page ? await Api.filters.get(id, options, { signal }) : undefined) ?? {}

	return { collection, collections, raindrops, filters, user, options }
}
