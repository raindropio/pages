import Helmet from 'react-helmet'
import Api from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'
import { parseQueryParams } from '~modules/format/url'
import links from '~config/links'
import find from 'lodash-es/find'

import Page from '~co/page'
import { LinkFactory } from '~modules/router'
import Button from '~co/button'
import Icon, { Logo } from '~co/icon'
import CollectionCover from '~co/collections/cover'
import Path from '~co/raindrops/path'
import Raindrops from '~co/raindrops/listing'
import Collections from '~co/collections/compact'
import { useChildrens } from '~co/collections/hooks'
import Toolbar from '~co/layout/toolbar'
import Sort from '~co/raindrops/sort'

export async function onBeforeRender({ routeParams: { id, user_name, options } }) {
	options = parseQueryParams(options)
	options.sort = options.sort || '-sort'
	options.perpage = options.perpage || RAINDROPS_PER_PAGE

	const [ collections, user ] = await Promise.all([
		Api.collections.getByUserName(user_name),
		Api.user.getByName(user_name)
	])

	const collection = find(collections, ['_id', parseInt(id)])

	if (!collection || !user)
        return {
            pageContext: { 
                statusCode: 404
            }
        }

	const raindrops = await Api.raindrops.get(id, {
		...options,
		nested: user.config?.nested_view_legacy ? false : true
	})

	return {
		pageContext: {
            pageProps: {
                collection,
                collections,
                raindrops,
                user,
                options
            }
        }
	}
}

export default function Collection({ statusCode, collection, collections, raindrops, user, options }) {
	if (statusCode)
		return null

    const baseUrl = `/${user.name}/${collection.slug}-${collection._id}`
	const fullUrl = `${links.site.index}${baseUrl}`
	const description = collection.description || `${raindrops.count} bookmarks`

	const childrens = useChildrens(collections, collection)

	return (
        <LinkFactory.Provider value={next=>{
            const params = new URLSearchParams(options)
            params.set('page', 0)

            if (Object.keys(next))
                for(const [key, val] of Object.entries(next))
                    params.set(key, val)

            return `${baseUrl}${params.get('search')?'/search':''}/${params.toString()}`
        }}>
            <Page.Wrap 
                wide={collection.view == 'grid' || collection.view == 'masonry'}
                theme={options.theme}
                accentColor={collection.color}>
                <Helmet>
                    <link 
                        rel='alternate'
                        type='application/json+oembed'
                        href={`${links.pub.index}/api/oembed?url=${encodeURIComponent(fullUrl)}`}
                        title={collection.title} />
                    <link 
                        rel='alternate'
                        type='application/rss+xml'
                        href={`https://raindrop.io/collection/${collection._id}/feed`}
                        title={collection.title} />

                    <link rel='canonical' href={fullUrl} />
                    <meta name='twitter:url' content={fullUrl} />
                    <meta name='og:url' content={fullUrl} />

                    <title>{collection.title}</title>
                    <meta name='twitter:title' content={collection.title} />
                    <meta name='og:title' content={collection.title} />

                    <meta name='og:type' content='website' />
                    <meta name='twitter:card' content='summary_large_image' />					

                    <meta name='description' content={description} />
                    <meta name='twitter:description' content={description} />
                    <meta name='og:description' content={description} />

                    <meta name='twitter:label1' content='Created by' />
                    <meta name='twitter:data1' content={user.name} />

                    {!!collection.cover?.length && [
                        <link key='icon' rel='icon' type='image/png' href={collection.cover[0]} />,
                        <meta key='ti' name='twitter:image' content={collection.cover[0]} />,
                        <meta key='oi' name='og:image' content={collection.cover[0]} />
                    ]}
                </Helmet>

                <Path 
                    collection={collection}
                    collections={collections}
                    user={user} />

                <Page.Header.Wrap>
                    <Page.Header.Icon>
                        <CollectionCover 
                            {...collection}
                            size='large'
                            fallback={false} />
                    </Page.Header.Icon>
                    
                    <Page.Header.Title>{collection.title}</Page.Header.Title>

                    <Page.Header.Buttons>
                        <Button 
                            variant='flat'
                            href={`/${user.name}/${collection.slug}-${collection._id}/share`}
                            bold>
                            <Icon name='upload-2' />
                        </Button>

                        <Button 
                            variant='flat' 
                            href={`/${user.name}/${collection.slug}-${collection._id}/search`}
                            data-prefetch={false}
                            title='Search'>
                            <Icon name='search' />
                        </Button>
                        
                        <Button 
                            variant='flat' 
                            href={links.site.index}
                            title='Raindrop.io'>
                            <Logo />
                        </Button>
                    </Page.Header.Buttons>
                </Page.Header.Wrap>

                <Page.Subheader>
                    {!!collection.description && (
                        <h2>
                            {collection.description}
                        </h2>
                    )}

                    {!parseInt(options.page) && (
                        <Collections
                            items={childrens}
                            user={user} />
                    )}
                </Page.Subheader>

                <Page.Content>
                    <Toolbar.Wrap>
                        <Toolbar.Title>
                            {options.search ? options.search : raindrops.count+' bookmarks'}
                        </Toolbar.Title>

                        {!!raindrops.items.length && (
                            <Toolbar.Buttons>
                                <Sort
                                    options={options} />
                            </Toolbar.Buttons>
                        )}
                    </Toolbar.Wrap>

                    <Raindrops 
                        collection={collection}
                        collections={collections}
                        user={user}
                        items={raindrops.items} />
                </Page.Content>

                <Page.Pagination 
                    page={options.page}
                    perpage={options.perpage}
                    count={raindrops.count} />

                <Page.Footer />
            </Page.Wrap>
        </LinkFactory.Provider>
	)
}