export function route(pageContext) {
	//match the raw pathname: options must stay encoded, they are decoded exactly once in parseQueryParams
	const match = pageContext.urlParsed.pathnameOriginal.match(/^\/([^/]+)\/(.+)-(\d+)\/share\/(.+)$/)
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
