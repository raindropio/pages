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
		const { httpResponse, statusCode, redirect, json } = await renderPage({
			url: req.originalUrl
		})

		if (redirect) {
			return res.redirect(statusCode||302, redirect)
		} else if (json) {
			return res
				.status(statusCode || 200)
				.json(json)
		} else if (!httpResponse)
			return next()
		
		res
			.status(statusCode || httpResponse.statusCode)
			.type(httpResponse.contentType)
			.send(httpResponse.body)
	})

	const port = 80
	app.listen(port)
	console.log(`Server running at http://localhost:${port}`)
}
