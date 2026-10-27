import { createHash } from 'node:crypto'
import { PLAUSIBLE_SCRIPT_ID } from '~config/vendors'

const src = `https://plausible.io/js/${PLAUSIBLE_SCRIPT_ID}.js`
const init = `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`

export const CSP_SCRIPT_SRC = `https://plausible.io 'sha256-${createHash('sha256').update(init).digest('base64')}'`

export function Script() {
	return (
		<>
			<script async src={src} />
			<script dangerouslySetInnerHTML={{ __html: init }} />
		</>
	)
}