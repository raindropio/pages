import Api from '~api'
import links from '~config/links'

let cache = { }

async function getUrl(id, { q, sort='' }) {
    const collection = cache[id] || await Api.collection.get(id)
    if (!collection) return null

    //get user name
    const user = await Api.user.getById(collection.user?.$id)
    if (!user) return null
    collection.user.name = user.name

    cache[id] = collection

    return `/${collection.user.name}/${collection.slug}-${collection._id}${q ? '/search' : ''}/${new URLSearchParams({
        sort,
        ...(q ? {
            search: q
                .split(',')
                .map(part=>{
                    if (part.includes('word:'))
                        return part.replace('word:', '')

                    return part.includes(' ') ? `"${part.replace('tag:', '#')}"` : part.replace('tag:', '#')
                })
                .join(' ')
        } : {})
    })}`
}

export async function onBeforeRender({ routeParams: { id }, url }) {
    if (isNaN(id))
        return {
            pageContext: { 
                statusCode: 404
            }
        }

    const destination = await getUrl(
        id, 
        Object.fromEntries(new URL(url, 'http://localhost').searchParams), 
    )

    if (!destination)
        return {
            pageContext: { 
                statusCode: 404
            }
        }

    return {
        pageContext: {
            redirect: `${links.site.index}${destination}`
        }
    }
}

export default ()=>null