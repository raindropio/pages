export function route(pageContext) {
	const match = pageContext.urlPathname.match(/^\/([^/]+)\/-(\d+)/)
	if (!match) return false
	return {
		routeParams: {
			user_name: match[1],
			id: match[2]
		}
	}
}
