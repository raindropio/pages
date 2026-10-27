import 'modern-normalize'
import './_app/app.css'
import { Sprite } from '~co/icon'

export function Layout({ children }) {
	return (
		<>
			<Sprite />

			{children}
		</>
	)
}
