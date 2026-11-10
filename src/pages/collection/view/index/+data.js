import Api, { FetchError } from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'
import { parseQueryParams } from '~modules/format/url'
import { render } from 'vike/abort'
import find from 'lodash-es/find'
import pick from 'lodash-es/pick'

export async function data({ routeParams: { id, user_name, options }, runtime }) {
	const { signal } = runtime.hono.req.raw //abort API calls when the client disconnects
	options = pick(parseQueryParams(options), ['search', 'sort', 'page', 'perpage', 'theme'])
	if (options.page < 0)
		throw render(404)

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

	const haveNested = collections.some(c => c.parent?.$id == collection._id)
	if ('search' in options)
		options.search = String(options.search)
	options.sort = options.sort || (haveNested ? '-created' : '-sort')
	options.perpage = parseInt(options.perpage || RAINDROPS_PER_PAGE)

	const raindrops = await Api.raindrops.get(id, {
		...options,
		nested: haveNested
	}, { signal })

	return { collection, collections, raindrops, user, options }
}
