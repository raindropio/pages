import Helmet from 'react-helmet'
import Api from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'
import { parseQueryParams } from '~modules/format/url'
import find from 'lodash-es/find'

import Page from '~co/page'
import { LinkFactory } from '~modules/router'
import Button from '~co/button'
import Icon from '~co/icon'
import Raindrops from '~co/raindrops/listing'
import Field from '~co/search/field'
import Tags from '~co/search/tags'
import Sort from '~co/raindrops/sort'
import Path from '~co/raindrops/path'
import Toolbar from '~co/layout/toolbar'

export async function onBeforeRender({ routeParams: { id, user_name, options } }) {
	options = parseQueryParams(options)
	options.sort = options.sort || (options.search?.length ? 'score' : '-created')
	options.perpage = RAINDROPS_PER_PAGE

	const [ collections, raindrops, user, filters={} ] = await Promise.all([
		Api.collections.getByUserName(user_name),
		Api.raindrops.get(id, options),
		Api.user.getByName(user_name),
		(!options.page ? Api.filters.get(id, options) : undefined)
	])

	const collection = find(collections, ['_id', parseInt(id)])

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
                collections,
                raindrops,
                filters,
                user,
                options
            },
            headers: {
                'Cache-Control': 'public,max-age=20'
            }
        }
	}
}

export default function SearchScreen({ statusCode, collection, collections, raindrops, filters, user, options }) {
	if (statusCode)
		return null

    const collectionUrl = `/${user.name}/${collection.slug}-${collection._id}`
    const baseUrl = `${collectionUrl}/search`
		
	return (
        <LinkFactory.Provider value={next=>{
            const params = new URLSearchParams(options)
            params.set('page', 0)
            
            if (Object.keys(next))
                for(const [key, val] of Object.entries(next))
                    switch(key) {
                        case 'search':
                            if (!(options.search||'').includes(val))
                                params.set('search', options.search ? `${options.search.trim()} ${val}` : val)
                        break

                        default: 
                            params.set(key, val)
                        break
                    }                

            return `${baseUrl}/${params.toString()}`
        }}>
            <Page.Wrap
                wide={collection.view == 'grid' || collection.view == 'masonry'}
                accentColor={collection.color}>
                <Helmet>
                    <title>Search {collection.title}</title>
                    {!!collection.cover?.length && <link rel='icon' type='image/png' href={collection.cover[0]} />}
                    <meta name='robots' content='noindex' />
                </Helmet>

                <Path 
                    self
                    collection={collection}
                    collections={collections}
                    user={user} />

                <Page.Header.Wrap>
                    <Field 
                        value={options.search}
                        placeholder={`Search ${collection.title}`} />

                    <Page.Header.Buttons style={{flex: 0}}>
                        <Button 
                            variant='flat' 
                            href={`${collectionUrl}/share/`+new URLSearchParams(options)}
                            title='Export & Share'
                            data-prefetch={false}>
                            <Icon name='upload-2' />
                        </Button>
                    </Page.Header.Buttons>
                </Page.Header.Wrap>

                <Page.Subheader>
                    <Tags
                        {...filters} />
                </Page.Subheader>

                <Page.Content>
                    <Toolbar.Wrap>
                        <Toolbar.Title>
                            {raindrops.count ? `Found ${raindrops.count} bookmarks` : 'Nothing found'}
                        </Toolbar.Title>

                        {!!raindrops.items.length && (
                            <Toolbar.Buttons>
                                <Sort options={options} />
                            </Toolbar.Buttons>
                        )}
                    </Toolbar.Wrap>

                    <Raindrops 
                        collection={collection}
                        collections={collections}
                        items={raindrops.items}
                        user={user} />
                </Page.Content>

                <Page.Pagination 
                    page={options.page}
                    perpage={options.perpage}
                    count={raindrops.count}
                    force={raindrops.items.length==options.perpage ? 'next' : true} />

                <Page.Footer />
            </Page.Wrap>
        </LinkFactory.Provider>
	)
}