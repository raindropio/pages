import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import Helmet from 'react-helmet'

import App from '~pages/_app'

export const passToClient = ['pageProps', 'statusCode']

export function render({ Page, pageProps={}, statusCode, headers={}, redirect, json }) {
	var documentHtml = null

	if (Page) {
		const content = ReactDOMServer.renderToString(
			<App>
				<Page 
					{...pageProps} 
					statusCode={statusCode} />
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
			headers: {
				'Content-Security-Policy': `
					default-src *;
					script-src 'self' https://*.raindrop.io https://*.sentry.io https://sentry.io ${import.meta.env.DEV ? '\'unsafe-inline\' \'unsafe-eval\'' : ''};
					style-src 'self' 'unsafe-inline' https://*.raindrop.io;
					img-src * blob:;
					object-src 'self' up.raindrop.io;
				`.replace(/\s+/g, ' '),

				'X-Content-Type-Options': 'nosniff', 

				...headers,
			},
			redirect,
			json,
		}
	}
}