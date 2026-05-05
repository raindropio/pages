import Api, { FetchError } from '~api'
import links from '~config/links'

const escapeXml = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeAttr = s => escapeXml(s).replace(/"/g, '&quot;')
const collectionUrl = (author, collection) => `https://${author.name}.${links.pub.domain}/${collection.slug}-${collection._id}`

function renderItem(item) {
	const body = item.note || item.excerpt || ''
	const html = (item.cover && item.cover != '<screenshot>' ? `<img src="${escapeAttr(item.cover)}" /><br/>` : '') + body

	return `<item>
		<title>${escapeXml(item.title)}</title>
		<link>${escapeXml(item.link)}</link>
		<description>${escapeXml(html)}</description>
		<pubDate>${new Date(item.created).toUTCString()}</pubDate>
		<guid>${escapeXml(item.link)}</guid>
		${item.tags?.map(tag => `<category>${escapeXml(tag)}</category>`).join('')}
	</item>`
}

function renderFeed({ collection, items, author }) {
	const cover = Array.isArray(collection.cover) ? collection.cover[0] : ''
	const channelLink = collectionUrl(author, collection)
	const selfHref = `${channelLink}/feed`

	return `<?xml version="1.0" encoding="utf-8" ?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
		<channel>
			<title>${escapeXml(collection.title)}</title>
			<link>${escapeXml(channelLink)}</link>
			<description>${escapeXml(collection.description)}</description>
			<language>en-US</language>
			<generator>raindrop.io</generator>
			<atom:link href="${escapeAttr(selfHref)}" rel="self" type="application/rss+xml"/>
			${cover ? `<image>
				<url>${escapeXml(cover)}</url>
				<link>${escapeXml(channelLink)}</link>
				<title>${escapeXml(collection.title)}</title>
			</image>` : ''}
			${items.length ? `<lastBuildDate>${new Date(items[0].lastUpdate).toUTCString()}</lastBuildDate>` : ''}
			${items.map(renderItem).join('')}
		</channel>
	</rss>`
}

export default async function handleFeed(c) {
	const id = Number(c.req.param('slug_id')?.split('-').at(-1))
	if (!id)
		return c.text('', 404)

	let collection, raindrops
	try {
		[collection, raindrops] = await Promise.all([
			Api.collection.get(id),
			Api.raindrops.get(id, { perpage: 50, sort: '-created' })
		])
	} catch (e) {
		if (e instanceof FetchError)
			return c.text('', e.status)
		throw e
	}

	if (!collection)
		return c.text('', 404)

	const author = await Api.user.getById(collection.user.$id)

	//redirect to original user if host is not equal
	const host = c.req.header('host')?.split('.')[0]
	if (author.name.toLowerCase() != host?.toLowerCase())
		return c.redirect(`${collectionUrl(author, collection)}/feed`, 301)

	return c.body(
		renderFeed({
			collection,
			items: raindrops.items || [],
			author
		}),
		200,
		{
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public,max-age=3600'
		}
	)
}