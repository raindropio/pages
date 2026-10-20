import { Head } from 'vike-react/Head'
import { useData } from 'vike-react/useData'

import Page from '~co/page'
import Icon, { Avatar } from '~co/icon'
import ArrowRightUpIcon from 'remixicon/icons/Arrows/arrow-right-up-line.svg?react'
import Button from '~co/button'
import Badge from '~co/badge'
import Collections from '~co/collections/listing'
import { useRoot } from '~co/collections/hooks'

export default function EmbedUser() {
	const { user, collections, options } = useData()

	const root = useRoot(collections)

	return (
		<Page.Wrap
			theme={options.theme}
			embed
			wide>
			<Head>
				<meta name='robots' content='noindex' />
			</Head>

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
							href='/'
							target='_blank'>
							Show all
							<Icon as={ArrowRightUpIcon} />
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