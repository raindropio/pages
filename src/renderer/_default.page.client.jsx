import React from 'react'
import { hydrate, render } from 'react-dom'
import { useClientRouter } from 'vite-plugin-ssr/client/router'

import App from '~pages/_app'

useClientRouter({
	async render({ Page, pageProps, statusCode, isHydration }) {
		(isHydration ? hydrate : render)(
			<App>
				<Page 
					{...pageProps} 
					statusCode={statusCode} />
			</App>,
			document.getElementById('content')
		)
	},
	ensureHydration: true,
	prefetch: true,
	onTransitionStart: ()=>{},
	onTransitionEnd: ()=>{}
})