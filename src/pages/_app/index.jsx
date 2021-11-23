import 'modern-normalize'
import './app.css'
import Helmet from 'react-helmet'

export default function App({ children }) {
	return (
		<>
			<Helmet>
				<html lang="en" />
				<meta name='viewport' content='width=device-width,height=device-height,initial-scale=1' />
				<meta name='og:site_name' content='Raindrop.io' />
				<meta name='twitter:site' content='@raindrop_io' />
				<meta name='twitter:domain' content='raindrop.io' />
			</Helmet>

			{children}
		</>
	)
}