import { Hono } from 'hono'
import { apply, serve } from '@photonjs/hono'
import oembed from './api/oembed/index.js'
import ogimage from './api/ogimage.js'

const app = new Hono()
app.get('/api/oembed', oembed)
app.get('/api/ogimage', ogimage)
apply(app)

export default serve(app)