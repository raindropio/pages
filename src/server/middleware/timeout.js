//one deadline per request: req.signal (passed to every API call) aborts, whatever was rendered after that becomes a 504
export default ms => async (c, next) => {
	const deadline = AbortSignal.timeout(ms)
	Object.defineProperty(c.req.raw, 'signal', { value: AbortSignal.any([c.req.raw.signal, deadline]) }) //srvx request must stay intact (Vike reads .runtime), so shadow the getter
	await next()
	if (!deadline.aborted) return
	c.res = undefined //otherwise Hono merges the old response's headers into the new one
	c.res = c.text('Gateway Timeout', 504, { 'Cache-Control': 'no-store' })
}