import links from '~config/links'
import { redirect } from 'vike/abort'

export function data({ routeParams: { user_name, id }, urlParsed }) {
	const subPath = urlParsed.pathname.replace(`/${user_name}/-${id}`, `/a-${id}`)
	throw redirect(`https://${user_name}.${links.pub.domain}${subPath}`)
}
