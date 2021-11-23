import Api from '~api'
import links from '~config/links'

const base = {
    success: true,
    version: '1.0',
    type: 'rich',
    provider_name: 'Raindrop.io',
    provider_url: links.site.index,
    height: 450
}

const regex = /^\/(.+)\/(.+)(\/|-)(\d+)/

export function validateURL(url) {
    const { pathname } = new URL(url)
    return regex.test(pathname)
}

export function getHTML({ user, collection }, options={}) {
    const { height, ...etc } = options

    const url = `${links.site.index}/${user.name}/${collection.slug}-${collection._id}/embed`+(
        Object.keys(etc).length ? '/'+new URLSearchParams(etc) : ''
    )

    return (`<iframe 
        style="border: 0; width: 100%; height: ${height || base.height}px;"
        allowfullscreen
        frameborder="0"
        src="${url}"></iframe>`)
        .replace(/\s+/g, ' ')
}

export default async function getJSON(url) {
    const [ pathname, user_name, slugOrSection, separator, id ] = new URL(url).pathname.match(regex)

    const [ collection, user ] = await Promise.all([
        Api.collection.get(id),
        Api.user.getByName(user_name),
    ])

    if (!collection || !user)
        return null

    return {
        ...base,
        title: collection.title,
        author_name: user_name,
        author_url: `${links.site.index}/${user_name}`,
        thumbnail_url: collection.cover?.length ? 
            collection.cover[0] : 
            `${process.env.SITE_URL}/icon_128.png`,
        thumbnail_width: 128,
        thumbnail_height: 128,
        cache_age: 3600,
        html: getHTML({ user, collection })
    }
}