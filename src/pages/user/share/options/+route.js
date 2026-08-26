export function route(pageContext) {
	//match the raw pathname: options must stay encoded, they are decoded exactly once in parseQueryParams
	const match = pageContext.urlParsed.pathnameOriginal.match(/^\/([^/]+)\/share\/me\/(.+)$/)
	if (!match) return false
	return {
		routeParams: {
			user_name: match[1],
			options: match[2]
		}
	}
}
