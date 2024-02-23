import { useCallback, useMemo } from 'react'
import Helmet from 'react-helmet'
import Api from '~api'
import { navigate } from 'vite-plugin-ssr/client/router'
import { parseQueryParams } from '~modules/format/url'
import { getHTML } from '~pages/api/oembed/user'
import { copyText } from '~modules/browser'
import links from '~config/links'

import Page from '~co/page'
import Button, { Share } from '~co/button'
import Icon from '~co/icon'
import Path from '~co/raindrops/path'
import Toolbar from '~co/layout/toolbar'
import Form, { Textarea, Label, Checkbox, Fields, Select } from '~co/form'

export async function onBeforeRender({ routeParams: { user_name, options } }) {
    options = parseQueryParams(options)

	const user = await Api.user.getByName(user_name)

	if (!user)
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
                user,
                options
            },
            headers: {
                'Cache-Control': 'public,max-age=20'
            }
        }
    }
}

export default function ShareUser({ statusCode, user, options }) {
	if (statusCode)
		return null

    const baseUrl = `/${user.name}/share/me`
	const canonicalUrl = `${links.site.index}/${user.name}`

	//form
	const value = useMemo(
		()=>({
            ...options,
            html: getHTML({ user }, options)
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
        <Page.Wrap>
            <Helmet>
                <title>Share {user.name}</title>
                <meta name='robots' content='noindex' />
            </Helmet>

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

                    <Label>Appearance</Label>
                    <Fields>
                        <div>
                            <Select 
                                name='theme'
                                options={[{value: '', label: 'Automatic (light or dark depending on user preferences)'}, {value:'light', label: 'Light'}, {value: 'dark', label: 'Dark'}]} />
                        </div>
                        <Checkbox name='no-header'>Hide header</Checkbox>
                    </Fields>

                    <Label>Preview</Label>
                    <Fields inset>
                        <div dangerouslySetInnerHTML={{__html: value.html}} />
                    </Fields>
                </Form>
            </Page.Content>

            <Page.Footer />
        </Page.Wrap>
	)
}