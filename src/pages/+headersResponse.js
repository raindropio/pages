export function headersResponse() {
	const isDev = import.meta.env.DEV

	return {
		...(!isDev && {
			'Content-Security-Policy': "default-src *; script-src 'self' https://raindrop.page https://*.raindrop.io https://*.sentry.io https://sentry.io; style-src 'self' 'unsafe-inline' https://raindrop.page https://*.raindrop.io; img-src * blob:; object-src 'self' up.raindrop.io;"
		}),
		'X-Content-Type-Options': 'nosniff'
	}
}