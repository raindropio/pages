import 'modern-normalize'
import './_app/app.css'
import { Head } from 'vike-react/Head'

export function Layout({ children }) {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width,height=device-height,initial-scale=1' />
				<meta name='og:site_name' content='Raindrop.io' />
				<meta name='twitter:site' content='@raindrop_io' />
				<meta name='twitter:domain' content='raindrop.io' />
			</Head>

			{children}

			<script
				src="https://raindrop.io/pb/s.js"
				data-domain='raindrop.io'
				data-api='https://raindrop.io/pb/api/event'
				data-exclude='' />
		</>
	)
}
