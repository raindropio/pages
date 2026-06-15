import { Hono } from 'hono'
import { apply, serve } from '@photonjs/hono'
import scamGuard from './middleware/scam-guard.js'
import oembed from './api/oembed/index.js'
import feed from './feed/index.js'

const app = new Hono()
app.use('*', scamGuard)
app.get('/api/oembed', oembed)
app.get('/:slug_id{.+-\\d+}/feed', feed)
apply(app)

export default serve(app)