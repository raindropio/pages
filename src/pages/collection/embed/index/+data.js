import Api, { FetchError } from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'
import { parseQueryParams } from '~modules/format/url'
import { render } from 'vike/abort'
import find from 'lodash-es/find'

export async function data({ routeParams: { id, user_name, options } }) {
	var user, collections
	try {
		var [user, collections] = await Promise.all([
			Api.user.getByName(user_name),
			Api.collections.getByUserName(user_name)
		])
	} catch(e) {
		if (e instanceof FetchError)
			throw render(e.status, e.message)

		throw e
	}

	const collection = find(collections, ['_id', parseInt(id)])

	if (!collection || !user)
		throw render(404)

	const haveNested = collections.some(c => c.parent?.$id == collection._id)
	options = parseQueryParams(options)
	options.sort = options.sort || (haveNested ? '-created' : '-sort')
	options.perpage = parseInt(options.perpage || RAINDROPS_PER_PAGE)

	const raindrops = await Api.raindrops.get(id, {
		...options,
		nested: haveNested
	})

	return { collection, collections, raindrops, user, options }
}
