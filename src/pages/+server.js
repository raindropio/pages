import path from 'node:path'
import { Hono } from 'hono'
import vike from '@vikejs/hono'
import { staticMiddleware } from 'srvx/static'
import oembed from '../server/api/oembed/index.js'
import feed from '../server/feed/index.js'

const ROBOTS = `User-agent: *
Disallow: /*/search/
Disallow: /*/share
Disallow: /*/embed
Disallow: /share/
Disallow: /embed/
`
const SEARCH_PATH = /-\d+\/search\//
const SEARCH_MAX_INFLIGHT = +process.env.SEARCH_MAX_INFLIGHT || 20
let searchInflight = 0

const app = new Hono()
app.onError((e, c) => {
	if (c.req.raw.signal.aborted) //client disconnected, nothing to respond to
		return c.body(null, 503)
	console.error(e)
	return c.text('Internal Server Error', 500)
})
vike(app)
app.get('/health', c => c.text('ok', 200, { 'Cache-Control': 'no-store' }))
app.get('/api/oembed', oembed)
app.get('/:slug_id{.+-\\d+}/feed', feed)
app.get('/robots.txt', c => c.text(ROBOTS, 200, { 'Cache-Control': 'public,max-age=86400' }))
app.use(async (c, next) => { //search URL space is infinite: log who crawls it, cap concurrency per instance
	if (!SEARCH_PATH.test(c.req.path)) return next()
	console.log('search', c.req.header('x-forwarded-for') || '-', JSON.stringify(c.req.header('user-agent') || '-'), c.req.header('host') + c.req.path)
	if (searchInflight >= SEARCH_MAX_INFLIGHT)
		return c.text('Too Many Requests', 429, { 'Retry-After': '10', 'Cache-Control': 'no-store' })
	searchInflight++
	try { await next() } finally { searchInflight-- }
})
app.use(async (c, next) => { //Vike doesn't apply +headersResponse to pageContext.json (client-side navigation)
	await next()
	if (c.res.ok && c.req.path.endsWith('.pageContext.json'))
		c.res.headers.set('Cache-Control', 'public,max-age=60,stale-while-revalidate=86400,stale-if-error=604800')
})

//Vike's default static serving (static: true) has no options: it brotli-compresses on the fly
//and sends no Cache-Control. So serve dist/client ourselves: no compression (edge does it), immutable cache.
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