import Helmet from 'react-helmet'
import Api from '~api'
import { parseQueryParams } from '~modules/format/url'

import Page from '~co/page'
import Icon, { Avatar } from '~co/icon'
import Button from '~co/button'
import Badge from '~co/badge'
import Collections from '~co/collections/listing'
import { useRoot } from '~co/collections/hooks'

export async function onBeforeRender({ routeParams: { user_name, options } }) {
	options = parseQueryParams(options)

	const [ user, collections ] = await Promise.all([
		Api.user.getByName(user_name),
		Api.collections.getByUserName(user_name)
	])

	if (!user || !collections?.length)
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
                user,
                collections,
                options
            },
            headers: {
                'Cache-Control': 'public,max-age=3'
            }
        }
    }
}

export default function EmbedUser({ statusCode, user, collections, options }) {
	if (statusCode)
		return null

	const root = useRoot(collections)

    return (
		<Page.Wrap 
			theme={options.theme}
            embed
            wide>
			<Helmet>
                <meta name='robots' content='noindex' />
			</Helmet>

			{!options['no-header'] && !options.hide?.includes('header') && (
				<Page.Header.Wrap>
					{!!user.avatar && (
						<Page.Header.Icon>
							<Avatar 
								src={user.avatar}
								alt={user.name}
								size='large' />
						</Page.Header.Icon>
					)}

					<Page.Header.Title>
						{user.name}
					</Page.Header.Title>

					{!!user.pro && (
						<Badge variant='disabled'>Pro</Badge>
					)}

					<Page.Header.Buttons>
						<Button 
							href={`/${user.name}`}
							target='_blank'>
							Show all
							<Icon name='arrow-right-up' />
						</Button>
					</Page.Header.Buttons>
				</Page.Header.Wrap>
			)}

			<Page.Content>
				<Collections 
					target='_blank'
					items={root}
					user={user} />
			</Page.Content>
		</Page.Wrap>
	)
}