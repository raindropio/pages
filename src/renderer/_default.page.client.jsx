import ReactDOM from 'react-dom'
import React from 'react'
import { getPage } from 'vite-plugin-ssr/client'
import App from '../pages/_app'

hydrate()

async function hydrate() {
	const { Page, pageProps } = await getPage()

	ReactDOM.hydrate(
		<App>
			<Page {...pageProps} />
		</App>,
		document.getElementById('content')
	)
}