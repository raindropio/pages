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

const regex = /^\/([a-zA-Z0-9][a-zA-Z0-9\-_]*)$/

export function validateURL(url) {
    const { pathname } = new URL(url)
    return regex.test(pathname)
}

export function getHTML({ user }, options={}) {
    const { height, ...etc } = options

    const url = `${links.site.index}/${user.name}/embed/me`+(
        Object.keys(etc).length ? '/'+new URLSearchParams(etc) : ''
    )

    return (`<iframe 
        style="border: 0; width: 100%; height: ${height || base.height}px;"
        allowfullscreen
        frameborder="0"
        src="${url}"
        allowfullscreen></iframe>`)
        .replace(/\s+/g, ' ')
}

export default async function getJSON(url) {
    const [ pathname, user_name ] = new URL(url).pathname.match(regex)

    const user = await Api.user.getByName(user_name)

    if (!user)
        return null

    return {
        ...base,
        title: user.name+' bookmarks',
        thumbnail_url: user.avatar ? 
            user.avatar : 
            `${process.env.SITE_URL}/icon_128.png`,
        thumbnail_width: 128,
        thumbnail_height: 128,
        cache_age: 3600,
        html: getHTML({ user })
    }
}