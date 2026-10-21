import vikeReact from 'vike-react/config'

export default {
	extends: [vikeReact],
	//one asset cache entry for all user subdomains, see README
	baseAssets: process.env.NODE_ENV === 'production' ? 'https://raindrop.page/' : '/',
	hooksTimeout: false,
	stream: true
}