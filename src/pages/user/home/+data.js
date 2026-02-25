import Api from '~api'
import { render } from 'vike/abort'

export async function data({ routeParams: { user_name } }) {
	const [user, collections] = await Promise.all([
		Api.user.getByName(user_name),
		Api.collections.getByUserName(user_name)
	])

	if (!user || !collections?.length)
		throw render(404)

	return { user, collections }
}
