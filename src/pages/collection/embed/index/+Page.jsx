import { Head } from 'vike-react/Head'
import { useData } from 'vike-react/useData'

import Page from '~co/page'
import { LinkFactory } from '~modules/router'
import Button from '~co/button'
import Icon, { Avatar } from '~co/icon'
import CollectionCover from '~co/collections/cover'
import Raindrops, { useInfiniteScroll } from '~co/raindrops/listing'
import Toolbar from '~co/layout/toolbar'

export default function EmbedCollection() {
	const { collection, collections, raindrops, user, options } = useData()

	const baseUrl = `/${collection.slug}-${collection._id}`
	const items = useInfiniteScroll(collection, raindrops, options)

	return (
		<LinkFactory.Provider value={() => baseUrl}>
			<Page.Wrap
				wide
				embed
				theme={options.theme}
				accentColor={collection.color}>
				<Head>
					<meta name='robots' content='noindex' />
				</Head>

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
									href='/'
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
