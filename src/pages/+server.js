import path from 'node:path'
import { Hono } from 'hono'
import vike from '@vikejs/hono'
import { staticMiddleware } from 'srvx/static'
import oembed from '../server/api/oembed/index.js'
import feed from '../server/feed/index.js'
import favicon from '../assets/favicon.ico'

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
app.get('/favicon.ico', c => {
	c.header('Cache-Control', 'public,max-age=86400')
	return c.redirect(favicon, 301)
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