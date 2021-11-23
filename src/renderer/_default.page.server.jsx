import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import Helmet from 'react-helmet'

import App from '~pages/_app'

export const passToClient = ['pageProps']

export function render({ Page, pageProps={}, statusCode, headers, redirect, json }) {
	var documentHtml = null

	if (Page) {
		const content = ReactDOMServer.renderToString(
			<App>
				<Page {...pageProps} />
			</App>
		)

		const helmet = Helmet.renderStatic()

		documentHtml = escapeInject`<!DOCTYPE html>
			<html ${dangerouslySkipEscape(helmet.htmlAttributes.toString())}>
				<head>
					<meta charSet="utf-8" />
					${dangerouslySkipEscape(
						helmet.title.toString() +
						helmet.meta.toString() +
						helmet.link.toString()
					)}
				</head>
				<body ${dangerouslySkipEscape(helmet.bodyAttributes.toString())}>
					<div id='content'>${dangerouslySkipEscape(content)}</div>
				</body>
			</html>
		`
	}

	return {
		documentHtml,
		pageContext: {
			statusCode,
			headers,
			redirect,
			json,
		}
	}
}