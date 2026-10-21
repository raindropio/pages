import { useCallback, useMemo, useState } from 'react'
import { Head } from 'vike-react/Head'
import { useData } from 'vike-react/useData'
import { getHTML } from '~server/api/oembed/user'
import { copyText } from '~modules/browser'
import links from '~config/links'

import Page from '~co/page'
import Button, { Share } from '~co/button'
import Icon from '~co/icon'
import FileCopyIcon from 'remixicon/icons/Document/file-copy-line.svg?react'
import Path from '~co/raindrops/path'
import Toolbar from '~co/layout/toolbar'
import Form, { Textarea, Label, Checkbox, Fields, Select } from '~co/form'

export default function ShareUser() {
	const { user, options: initial } = useData()
	const [options, setOptions] = useState(initial)

	const baseUrl = `/share/me`
	const canonicalUrl = `https://${user.name}.${links.pub.domain}`

	const value = useMemo(
		() => ({
			...options,
			html: getHTML({ user }, options)
		}),
		[options]
	)

	const onChange = useCallback(value => {
		let { html, ...options } = value

		for (const i in options)
			if (!options[i])
				delete options[i]

		setOptions(options)
		history.replaceState(null, '', `${baseUrl}/${new URLSearchParams(options).toString()}`)
	}, [])

	return (
		<Page.Wrap>
			<Head>
				<title>{`Share ${user.name}`}</title>
				<meta name='robots' content='noindex' />
			</Head>

			<Path user={user} />

			<Page.Header.Wrap>
				<Page.Header.Title>Share User Profile</Page.Header.Title>
				<Page.Header.Buttons>
					<Share
						url={canonicalUrl}
						title={user.name} />
				</Page.Header.Buttons>
			</Page.Header.Wrap>

			<Page.Subheader>
				<h2>Share your collections with social community or embed to website or blog</h2>
			</Page.Subheader>

			<Page.Content>
				<Toolbar.Wrap>
					<Toolbar.Title>Embed</Toolbar.Title>
					<Toolbar.Buttons>
						<Button
							variant='active'
							bold
							onClick={() => copyText(value.html)}>
							<Icon as={FileCopyIcon} />
							Copy Code
						</Button>
					</Toolbar.Buttons>
				</Toolbar.Wrap>

				<Form
					value={value}
					onChange={onChange}>
					<Label>Code</Label>
					<Textarea
						name='html'
						autoFocus
						readOnly />

					<Label>Appearance</Label>
					<Fields>
						<div>
							<Select
								name='theme'
								options={[{ value: '', label: 'Automatic (light or dark depending on user preferences)' }, { value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
						</div>
						<Checkbox name='no-header'>Hide header</Checkbox>
					</Fields>

					<Label>Preview</Label>
					<Fields inset>
						<div dangerouslySetInnerHTML={{ __html: value.html }} />
					</Fields>
				</Form>
			</Page.Content>

			<Page.Footer />
		</Page.Wrap>
	)
}