import { FetchError } from './errors'

const TIMEOUT = 8000

//dies with the client (signal) or after TIMEOUT, so a slow API can't hold a Vike hook for 30s
export async function apiFetch(url, { signal } = {}) {
	const timeout = AbortSignal.timeout(TIMEOUT)
	try {
		return await fetch(url, { signal: signal ? AbortSignal.any([signal, timeout]) : timeout })
	} catch (e) {
		if (timeout.aborted)
			throw new FetchError(504, 'api timeout')
		throw e
	}
}