export function headersResponse() {
	return { 'Cache-Control': 'public,max-age=60,stale-while-revalidate=86400,stale-if-error=604800' }
}