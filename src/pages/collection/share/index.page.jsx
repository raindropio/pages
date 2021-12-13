import { useCallback, useMemo, useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import Api from '~api'
import { navigate } from 'vite-plugin-ssr/client/router'
import { parseQueryParams } from '~modules/format/url'
import { getHTML } from '~pages/api/oembed/collection'
import { copyText } from '~modules/browser'
import links from '~config/links'

import Page from '~co/page'
import Button, { Share, Buttons } from '~co/button'
import Icon from '~co/icon'
import Path from '~co/raindrops/path'
import Toolbar from '~co/layout/toolbar'
import Form, { Textarea, Label, Select, Input, Fields } from '~co/form'

export async function onBeforeRender({ routeParams: { id, user_name, options } }) {
    options = parseQueryParams(options)

	const [ collection, user ] = await Promise.all([
		Api.collection.get(id),
		Api.user.getByName(user_name)
	])

	if (!collection || !user)
        return {
            pageContext: { 
                statusCode: 404,
                headers: {
                    'Cache-Control': 'public,max-age=60'
                }
            }
        }

	return {
		pageContext: {
            pageProps: {
                collection,
                user,
                options
            },
            headers: {
                'Cache-Control': 'public,max-age=20'
            }
        }
    }
}

function PreviewDebounced({ html }) {
	const [load, setLoad] = useState(true)

	useEffect(()=>{
		setLoad(false)
		clearTimeout(window.__pdt)
		window.__pdt = setTimeout(() => {
			setLoad(true)
			window.__pdt = undefined
		}, 500)
	}, [html])

	if (!load)
		return null

	return <div dangerouslySetInnerHTML={{__html: html}} />
}

export default function ShareCollection({ statusCode, collection, user, options }) {
	if (statusCode)
		return null

    const baseUrl = `/${user.name}/${collection.slug}-${collection._id}/share`
	const canonicalUrl = `${links.site.index}/${user.name}/${collection.slug}-${collection._id}`

	//form
	const value = useMemo(
		()=>({
            ...options,
            sort: options.sort || '',
            html: getHTML({ user, collection }, options)
        }),
        [options]
    )

	const onChange = useCallback(value=>{
		let { html, ...options } = value

		for(const i in options)
			if (!options[i])
				delete options[i]

        navigate(`${baseUrl}/${new URLSearchParams(options).toString()}`, { keepScrollPosition: true })
	}, [])
		
	return (
        <Page.Wrap accentColor={collection.color}>
            <Helmet>
                <title>Share {collection.title}</title>
                <meta name='robots' content='noindex' />
            </Helmet>

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
                        target='_blank'>
                        <Icon name='rss' /> RSS
                    </Button>
                </Buttons>

                <Toolbar.Wrap>
                    <Toolbar.Title>Embed</Toolbar.Title>
                    <Toolbar.Buttons>
                        <Button 
                            variant='flat'
                            target='_blank'
                            href={links.help.embed}>
                            <Icon name='question' />
                        </Button>

                        <Button
                            variant='active'
                            bold
                            onClick={()=>copyText(value.html)}>
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
                            options={[{value:'', label: 'Custom (curator specified)'}, {value:'-created', label: 'By date (newest)'}, {value: 'created', label: 'By date (oldest)'}, {value: 'title', label: 'By name (A-Z)'}, {value: '-title', label: 'By name (Z-A)'}]} />
                    </div>

                    <Label>Search</Label>
                    <Input name='search' placeholder='By #tag, title, etc...' />
                    
                    <Label>Appearance</Label>
                    <Fields>
                        <div>
                            <Select 
                                name='theme'
                                options={[{value:'', label: 'Light theme'}, {value: 'dark', label: 'Dark theme'}, {value: 'auto', label: 'Automatic theme (light or dark depending on user preferences)'}]} />
                        </div>

                        <Input name='hide' placeholder='Hide some elements (separated by comma)...' />
                    </Fields>

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