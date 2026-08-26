import { Hono } from 'hono'
import { apply, serve } from '@photonjs/hono'
import oembed from './api/oembed/index.js'
import feed from './feed/index.js'

const app = new Hono()
app.get('/api/oembed', oembed)
app.get('/:slug_id{.+-\\d+}/feed', feed)
apply(app)

export default serve(app)