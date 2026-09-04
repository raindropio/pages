import { Agent, setGlobalDispatcher } from 'undici'
import { Hono } from 'hono'
import { apply, serve } from '@photonjs/hono'
import oembed from './api/oembed/index.js'
import feed from './feed/index.js'

//HTTP/2 + long keep-alive for all server-side fetch() calls (api.raindrop.io)
setGlobalDispatcher(new Agent({ allowH2: true, connections: 4, keepAliveTimeout: 30_000 }))

const app = new Hono()
app.get('/api/oembed', oembed)
app.get('/:slug_id{.+-\\d+}/feed', feed)
apply(app)

export default serve(app)