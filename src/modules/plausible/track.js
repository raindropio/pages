import { PLAUSIBLE_DOMAIN } from '~config/vendors'

//fire-and-forget, https://plausible.io/docs/events-api
export function track({ ip, userAgent, ...event }) {
	if (!ip || !userAgent) return //plausible drops such events anyway

	fetch('https://plausible.io/api/event', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': userAgent,
			'X-Forwarded-For': ip
		},
		body: JSON.stringify({ domain: PLAUSIBLE_DOMAIN, ...event }),
		signal: AbortSignal.timeout(3_000)
	}).catch(() => {})
}