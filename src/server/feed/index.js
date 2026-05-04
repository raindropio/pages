import Api, { FetchError } from '~api'

const escapeCdata = s => String(s ?? '').replace(/]]>/g, ']]]]><![CDATA[>')
const escapeAttr = s => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const cdata = s => `<![CDATA[ ${escapeCdata(s)} ]]>`

function renderItem(item) {
	const cover = Array.isArray(item.cover) ? item.cover[0] : item.cover
	const hasCover = cover && cover != '<screenshot>'
	const body = item.note || item.excerpt || ''
	const description = (hasCover ? `<img src="${escapeAttr(cover)}" /><br/>` : '') + escapeCdata(body)
	const tags = Array.isArray(item.tags) ? item.tags : []

	return `<item>
			<title>${cdata(item.title)}</title>
			<link>${escapeAttr(item.link)}</link>
			<description><![CDATA[ ${description} ]]></description>
			<pubDate>${new Date(item.created).toUTCString()}</pubDate>
			<guid>${escapeAttr(item.link)}</guid>
			<category>${escapeAttr(item.type)}</category>
			${tags.map(tag => `<category>${cdata(tag)}</category>`).join('')}
		</item>`
}

function renderFeed({ collection, items, host, slug_id }) {
	const cover = Array.isArray(collection.cover) ? collection.cover[0] : ''
	const titleSuffixed = `${collection.title} / Raindrop.io`
	const channelLink = `https://${host}`
	const selfHref = `https://${host}/${slug_id}/feed`

	return `<?xml version="1.0" encoding="utf-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${cdata(titleSuffixed)}</title>
		<link>${escapeAttr(channelLink)}</link>
		<description><![CDATA[ ]]></description>
		<language>en-US</language>
		<generator>raindrop.page</generator>
		<atom:link href="${escapeAttr(selfHref)}" rel="self" type="application/rss+xml"/>
		${cover ? `<image>
			<url>${escapeAttr(cover)}</url>
			<link>${escapeAttr(channelLink)}</link>
			<title>${cdata(titleSuffixed)}</title>
		</image>` : ''}
		${items.length ? `<lastBuildDate>${new Date(items[0].lastUpdate).toUTCString()}</lastBuildDate>` : ''}
		${items.map(renderItem).join('')}
	</channel>
</rss>`
}

export default async function handleFeed(c) {
	const slug_id = c.req.param('slug_id')
	const match = slug_id.match(/-(\d+)$/)
	if (!match)
		return c.text('', 404)

	const id = match[1]
	const host = c.req.header('host') || ''

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

	const xml = renderFeed({ collection, items: raindrops.items || [], host, slug_id })

	return c.body(xml, 200, {
		'Content-Type': 'application/rss+xml; charset=utf-8',
		'Cache-Control': 'public,max-age=3600'
	})
}
