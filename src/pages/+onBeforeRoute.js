export function onBeforeRoute(pageContext) {
	const host = pageContext.headers?.host?.split(':')[0]
		|| (typeof window !== 'undefined' ? window.location.hostname : '')

	const dot = host.indexOf('.')
	if (dot < 1) return

	const username = host.slice(0, dot)

	return {
		pageContext: {
			urlLogical: '/' + username +
				(pageContext.urlParsed.pathnameOriginal === '/' ? '' : pageContext.urlParsed.pathnameOriginal) +
				(pageContext.urlParsed.searchOriginal || '')
		}
	}
}
