import path from 'node:path'
import { Hono } from 'hono'
import vike from '@vikejs/hono'
import { staticMiddleware } from 'srvx/static'
import oembed from '../server/api/oembed/index.js'
import feed from '../server/feed/index.js'

const app = new Hono()
app.onError((e, c) => {
	if (c.req.raw.signal.aborted) //client disconnected, nothing to respond to
		return c.body(null, 503)
	console.error(e)
	return c.text('Internal Server Error', 500)
})
app.get('/api/oembed', oembed)
app.get('/:slug_id{.+-\\d+}/feed', feed)
vike(app)

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
			const res = await serveStatic(req, next)
			if (res?.headers?.has('Cache-Control')) //add `public` for the edge cache
				res.headers.set('Cache-Control', 'public,' + res.headers.get('Cache-Control'))
			return res
		}]
	}
}
