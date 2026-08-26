import links from '~config/links'
import { redirect } from 'vike/abort'

export function data({ routeParams: { user_name, id }, urlParsed }) {
	//keep the path encoded, a decoded `%23` would become a fragment in the Location header
	const subPath = urlParsed.pathnameOriginal.replace(`/${user_name}/-${id}`, `/a-${id}`)
	throw redirect(`https://${user_name}.${links.pub.domain}${subPath}`)
}
