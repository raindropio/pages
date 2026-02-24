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

const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9\-_]*$/

export function validateURL(url) {
    const { hostname, pathname } = new URL(url)
    const parts = hostname.split('.')
    return hostname.endsWith(links.pub.domain) && parts.length >= 3 &&
        usernameRegex.test(parts[0]) && (pathname === '/' || pathname === '')
}

export function getHTML({ user }, options={}) {
    const { height, ...etc } = options

    const url = `https://${user.name}.${links.pub.domain}/embed/me`+(
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
    const user_name = new URL(url).hostname.split('.')[0]

    const user = await Api.user.getByName(user_name)

    if (!user)
        return null

    return {
        ...base,
        title: user.name+' bookmarks',
        thumbnail_url: user.avatar ?
            user.avatar :
            `${import.meta.env.BASE_URL}icon_128.png`,
        thumbnail_width: 128,
        thumbnail_height: 128,
        cache_age: 3600,
        html: getHTML({ user })
    }
}
