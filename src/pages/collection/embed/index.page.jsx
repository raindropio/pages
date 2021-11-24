import Helmet from 'react-helmet'
import Api from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'
import { parseQueryParams } from '~modules/format/url'
import find from 'lodash-es/find'

import Page from '~co/page'
import { LinkFactory } from '~modules/router'
import Button from '~co/button'
import Icon, { Avatar } from '~co/icon'
import CollectionCover from '~co/collections/cover'
import Raindrops, { useInfiniteScroll } from '~co/raindrops/listing'
import Toolbar from '~co/layout/toolbar'

export async function onBeforeRender({ routeParams: { id, user_name, options } }) {
	options = parseQueryParams(options)
	options.sort = options.sort || '-sort'
	options.perpage = parseInt(options.perpage || RAINDROPS_PER_PAGE)

	const [ collections, raindrops, user ] = await Promise.all([
		Api.collections.getByUserName(user_name),
		Api.raindrops.get(id, options),
		Api.user.getByName(user_name)
	])

	const collection = find(collections, ['_id', parseInt(id)])

	//notFound: true doesn't refresh cached pages :( so instead do this:
	if (!collection || !user)
        return {
            pageContext: { 
                statusCode: 404,
                headers: {
                    'Cache-Control': 'public,max-age=10'
                }
            }
        }

	return {
		pageContext: {
            pageProps: {
                collection,
                collections,
                raindrops,
                user,
                options
            },
            headers: {
                'Cache-Control': 'public,max-age=3'
            }
        }
    }
}

export default function EmbedCollection({ statusCode, collection, collections, raindrops, user, options }) {
	if (statusCode)
		return null

    const baseUrl = `/${user.name}/${collection.slug}-${collection._id}`
	const items = useInfiniteScroll(collection, raindrops, options)
		
	return (
        <LinkFactory.Provider value={()=>baseUrl}>
            <Page.Wrap 
                wide
                embed
                theme={options.theme}
                accentColor={collection.color}>
                <Helmet>
                    <meta name='robots' content='noindex' />
                </Helmet>

                {!options['no-header'] && !options.hide?.includes('header') && (
                    <Page.Header.Wrap>
                        <Page.Header.Icon>
                            <CollectionCover 
                                {...collection}
                                size='large' />
                        </Page.Header.Icon>

                        <Page.Header.Title>{collection.title}</Page.Header.Title>

                        <Page.Header.Buttons>
                            <Button 
                                href={baseUrl}
                                target='_blank'>
                                More
                                <Icon name='arrow-right-up' />
                            </Button>

                            {!!user.avatar && (
                                <Button 
                                    variant='flat' 
                                    href={`/${user.name}`}
                                    title={user.name}
                                    target='_blank'>
                                    <Avatar 
                                        src={user.avatar} 
                                        alt={user.name}
                                        size='large' />
                                </Button>
                            )}
                        </Page.Header.Buttons>
                    </Page.Header.Wrap>
                )}

                <Page.Content>
                    {!!options.search && !options['no-header'] && !options.hide?.includes('header') && (
                        <Toolbar.Wrap>
                            <Toolbar.Title>{options.search}</Toolbar.Title>
                        </Toolbar.Wrap>
                    )}

                    <Raindrops 
                        target='_blank'
                        collection={collection}
                        collections={collections}
                        items={items}
                        user={user}
                        options={options} />
                </Page.Content>
            </Page.Wrap>
        </LinkFactory.Provider>
	)
}