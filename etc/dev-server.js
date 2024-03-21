const express = require('express')
const { createPageRenderer } = require('vite-plugin-ssr')
const vite = require('vite')

const isProduction = process.env.NODE_ENV === 'production'
const root = `${__dirname}/..`

global.fetch = require('node-fetch')

startServer()

async function startServer() {
	const app = express()

	let viteDevServer
	if (isProduction) 
		app.use(express.static(`${root}/dist/client`))
	else {
		viteDevServer = await vite.createServer({
			root,
			server: { middlewareMode: true },
		})

		app.use(viteDevServer.middlewares)
	}

	const renderPage = createPageRenderer({ viteDevServer, isProduction, root })
	app.get('*', async (req, res, next) => {
		const { httpResponse, statusCode, headers={}, redirect, json, proxy } = await renderPage({
			url: req.originalUrl
		})

		//remove caching headers for dev
		if (!isProduction)
			for(const i of Object.keys(headers))
				if (i.toLowerCase() == 'cache-control')
					delete headers[i]

		if (redirect) {
			return res.redirect(statusCode||302, redirect)
		} else if (proxy) {
			const r = await fetch(proxy)
			r.body.pipe(res)
			return res
				.status(r.status)
				.type(r.headers.get('content-type'))
		} else if (json)
			return res
				.status(statusCode || 200)
				.set(headers)
				.json(json)
		else if (!httpResponse)
			return next()
		
		res
			.status(statusCode || httpResponse.statusCode)
			.type(httpResponse.contentType)
			.set(headers)
			.send(httpResponse.body)
	})

	const port = 80
	app.listen(port)
	console.log(`Server running at http://localhost:${port}`)
}
