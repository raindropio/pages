export function headersResponse({ abortStatusCode }) {
	return { 'Cache-Control': abortStatusCode ? 'public,max-age=60,stale-while-revalidate=86400' : 'public,max-age=86400' }
}