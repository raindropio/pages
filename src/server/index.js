import { Hono } from 'hono'
import { apply, serve } from '@photonjs/hono'
import oembed from './api/oembed/index.js'

const app = new Hono()
app.get('/api/oembed', oembed)
apply(app)

export default serve(app)