export function route(pageContext) {
	const match = pageContext.urlPathname.match(/^\/([^/]+)\/(.+)-(\d+)\/share\/(.+)$/)
	if (!match) return false
	return {
		routeParams: {
			user_name: match[1],
			slug: match[2],
			id: match[3],
			options: match[4]
		}
	}
}
