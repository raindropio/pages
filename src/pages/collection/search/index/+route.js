export default function route(pageContext) {
	const match = pageContext.urlPathname.match(/^\/([^/]+)\/(.+)-(\d+)\/search$/)
	if (!match) return false
	return {
		routeParams: {
			user_name: match[1],
			slug: match[2],
			id: match[3]
		}
	}
}
