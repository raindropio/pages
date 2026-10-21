import path from 'node:path'
import { Hono } from 'hono'
import { rateLimiter } from 'hono-rate-limiter'
import vike from '@vikejs/hono'
import { staticMiddleware } from 'srvx/static'
import oembed from '../server/api/oembed/index.js'
import feed from '../server/feed/index.js'
import timeout from '../server/middleware/timeout.js'

const app = new Hono()

app.onError((e, c) => {
	if (c.req.raw.signal.aborted) return c.body(null, 503)
	console.error(e)
	return c.text('Internal Server Error', 500)
})

vike(app)

app.get('/health', c => c.text('ok', 200, { 'Cache-Control': 'no-store' }))

app.use(rateLimiter({
	windowMs: 60_000,
	limit: 60,
	keyGenerator: c => c.req.header('x-forwarded-for')?.split(',')[0].trim() || 'unknown',
	handler: c => c.text('Too Many Requests', 429, { 'Cache-Control': 'no-store' })
}))

app.use(timeout(5_000))

app.get('/api/oembed', oembed)
app.get('/:slug_id{.+-\\d+}/feed', feed)

app.use(async (c, next) => { //Vike doesn't apply +headersResponse to pageContext.json (client-side navigation)
	await next()
	if (c.res.ok && c.req.path.endsWith('.pageContext.json'))
		c.res.headers.set('Cache-Control', 'public,max-age=60,stale-while-revalidate=86400,stale-if-error=604800')
})

const serveStatic = staticMiddleware({
	dir: path.resolve(process.argv[1], '../../client'), //dist/client, next to the running dist/server/index.mjs
	compress: false,
	maxAge: 31536000,
	immutable: true
})

export default {
	fetch: app.fetch,
	prod: {
		static: false,
		middleware: [async (req, next) => {
			let isStatic = true
			const res = await serveStatic(req, () => { isStatic = false; return next() })
			if (isStatic && res?.headers?.has('Cache-Control')) {
				res.headers.set('Cache-Control', 'public,' + res.headers.get('Cache-Control')) //add `public` for the edge cache
				res.headers.set('Access-Control-Allow-Origin', '*') //assets live on raindrop.page, pages on subdomains
			}
			return res
		}]
	}
}