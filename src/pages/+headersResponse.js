export function headersResponse() {
	const isDev = import.meta.env.DEV

	return {
		...(!isDev && {
			'Content-Security-Policy': "default-src *; script-src 'self' https://plausible.io 'sha256-Ebt84R/xi8miDnxS/0/bkTjVgDRKQpWS1eI09TLbNkg=' https://raindrop.page https://*.raindrop.io https://*.sentry.io https://sentry.io; style-src 'self' 'unsafe-inline' https://raindrop.page https://*.raindrop.io; img-src * blob:; object-src 'self' up.raindrop.io;"
		}),
		'X-Content-Type-Options': 'nosniff'
	}
}