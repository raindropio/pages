import { useCallback, useMemo, useEffect, useState } from 'react'
import { Head } from 'vike-react/Head'
import { useData } from 'vike-react/useData'
import { navigate } from 'vike/client/router'
import { getHTML } from '~server/api/oembed/collection'
import { copyText } from '~modules/browser'
import links from '~config/links'

import Page from '~co/page'
import Button, { Share, Buttons } from '~co/button'
import Icon from '~co/icon'
import Path from '~co/raindrops/path'
import Toolbar from '~co/layout/toolbar'
import Form, { Textarea, Label, Select, Input, Fields } from '~co/form'

function PreviewDebounced({ html }) {
	const [load, setLoad] = useState(true)

	useEffect(() => {
		setLoad(false)
		clearTimeout(window.__pdt)
		window.__pdt = setTimeout(() => {
			setLoad(true)
			window.__pdt = undefined
		}, 500)
	}, [html])

	if (!load)
		return null

	return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default function ShareCollection() {
	const { collection, user, options } = useData()

	const baseUrl = `/${collection.slug}-${collection._id}/share`
	const canonicalUrl = `https://${user.name}.${links.pub.domain}/${collection.slug}-${collection._id}`

	const value = useMemo(
		() => ({
			...options,
			sort: options.sort || '',
			html: getHTML({ user, collection }, options)
		}),
		[options]
	)

	const onChange = useCallback(value => {
		let { html, ...options } = value

		for (const i in options)
			if (!options[i])
				delete options[i]

		navigate(`${baseUrl}/${new URLSearchParams(options).toString()}`, { keepScrollPosition: true })
	}, [])

	return (
		<Page.Wrap accentColor={collection.color}>
			<Head>
				<title>{`Share ${collection.title}`}</title>
				<meta name='robots' content='noindex' />
			</Head>

			<Path
				self
				collection={collection}
				user={user} />

			<Page.Header.Wrap>
				<Page.Header.Title>Share {collection.title}</Page.Header.Title>
				<Page.Header.Buttons>
					<Share
						url={canonicalUrl}
						title={collection.title} />
				</Page.Header.Buttons>
			</Page.Header.Wrap>

			<Page.Subheader>
				<h2>Share this collection with your social community or embed to website or blog</h2>
			</Page.Subheader>

			<Page.Content>
				<Toolbar.Wrap>
					<Toolbar.Title>Export</Toolbar.Title>
				</Toolbar.Wrap>
				<Buttons>
					<Button
						href={`${links.site.index}/collection/${collection._id}/feed`}
						target='_blank'
						rel='nofollow noopener noreferrer'>
						<Icon name='rss' /> RSS
					</Button>
				</Buttons>

				<Toolbar.Wrap>
					<Toolbar.Title>Embed</Toolbar.Title>
					<Toolbar.Buttons>
						<Button
							variant='flat'
							target='_blank'
							rel='nofollow noopener noreferrer'
							href={links.help.embed}>
							<Icon name='question' />
						</Button>

						<Button
							variant='active'
							bold
							onClick={() => copyText(value.html)}>
							<Icon name='file-copy' />
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

					<Label>Sort</Label>
					<div>
						<Select
							name='sort'
							options={[{ value: '', label: 'Custom (curator specified)' }, { value: '-created', label: 'By date (newest)' }, { value: 'created', label: 'By date (oldest)' }, { value: 'title', label: 'By name (A-Z)' }, { value: '-title', label: 'By name (Z-A)' }]} />
					</div>

					<Label>
						Filter

						<Button
							href={links.help.search + '#operators'}
							target='_blank'
							rel='nofollow noopener noreferrer'
							size='small'
							variant='flat'>
							<Icon name='question' size='small' />
						</Button>
					</Label>
					<Input name='search' placeholder='By #tag, title, etc...' />

					<Label>Theme</Label>
					<div>
						<Select
							name='theme'
							options={[{ value: '', label: 'Automatic (light or dark depending on user preferences)' }, { value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
					</div>

					<Label>
						Hide elements

						<Button
							href={links.help.embed + '#hide-some-elements'}
							target='_blank'
							rel='nofollow noopener noreferrer'
							size='small'
							variant='flat'>
							<Icon name='question' size='small' />
						</Button>
					</Label>
					<Input name='hide' placeholder='Separated by comma...' />

					<Label>Preview</Label>
					<Fields inset>
						<PreviewDebounced html={value.html} />
					</Fields>
				</Form>
			</Page.Content>

			<Page.Footer />
		</Page.Wrap>
	)
}
