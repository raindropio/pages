import { track } from '~modules/plausible'

//vike routes are ignored
//vike renders pages from app.notFound, so a page matches no route
export default async (c, next) => {
	await next()
	if (!c.res.ok || !c.req.matchedRoutes.some(route => route.method != 'ALL')) return

	track({
		name: 'pageview',
		url: c.req.url,
		referrer: c.req.header('referer'),
		interactive: false,
		ip: c.req.header('x-forwarded-for'),
		userAgent: c.req.header('user-agent')
	})
}