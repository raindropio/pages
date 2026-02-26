import 'modern-normalize'
import './app.css'
import Helmet from 'react-helmet'

export default function App({ children }) {
	return (
		<>
			<Helmet>
				<html lang="en" />
				<meta name='viewport' content='width=device-width,height=device-height,initial-scale=1' />
			</Helmet>

			{children}

			<script
				src="https://raindrop.io/pb/s.js"
				data-domain='raindrop.io'
				data-api='https://raindrop.io/pb/api/event'
				data-exclude='' />
		</>
	)
}