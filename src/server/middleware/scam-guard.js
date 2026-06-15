// Block paid ad-click traffic: scam landing pages live entirely off Google Ads,
// real users never advertise their pages. Kills the conversion, burns their budget.
const AD_PARAMS = ['gclid', 'gbraid', 'wbraid', 'gclsrc', 'gad_source', 'dclid', 'msclkid', 'fbclid', 'yclid']

export default function adGuard(c, next) {
	const q = c.req.query()
	if (AD_PARAMS.some(p => p in q))
		return c.text('let\'s dance?', 403)
	return next()
}