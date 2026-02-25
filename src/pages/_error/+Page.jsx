import { usePageContext } from 'vike-react/usePageContext'

export default function ErrorPage() {
	const { is404 } = usePageContext()
	return (
		<h1>{is404 ? '404' : '500'} Error</h1>
	)
}
