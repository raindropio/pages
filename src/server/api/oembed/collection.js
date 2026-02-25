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

const pathRegex = /^\/(.+)-(\d+)/

export function validateURL(url) {
    const { hostname, pathname } = new URL(url)
    return hostname.endsWith(links.pub.domain) && hostname !== links.pub.domain && pathRegex.test(pathname)
}

export function getHTML({ user, collection }, options={}) {
    const { height, ...etc } = options

    const url = `https://${user.name}.${links.pub.domain}/${collection.slug}-${collection._id}/embed`+(
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
    const { hostname, pathname } = new URL(url)
    const user_name = hostname.split('.')[0]
    const [, , id] = pathname.match(pathRegex)

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
        author_url: `https://${user_name}.${links.pub.domain}`,
        thumbnail_url: collection.cover?.length ?
            collection.cover[0] :
            `${import.meta.env.BASE_URL}icon_128.png`,
        thumbnail_width: 128,
        thumbnail_height: 128,
        cache_age: 3600,
        html: getHTML({ user, collection })
    }
}
