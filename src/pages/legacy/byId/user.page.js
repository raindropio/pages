import Api from '~api'
import links from '~config/links'

const cache = {}

async function getUrl(id) {
    if (cache[id]) return cache[id]

    const user = await Api.user.getById(id)
    if (!user) return cache[id]=null

    return cache[id]=`${links.site.index}/${user.name}`
}

export async function onBeforeRender({ routeParams: { id } }) {
    if (isNaN(id))
        return {
            pageContext: { 
                statusCode: 404
            }
        }
        
    const url = await getUrl(id)
    if (!url)
        return {
            pageContext: { 
                statusCode: 404
            }
        }

    return {
        pageContext: { 
            statusCode: 308,
            redirect: url
        }
    }
}

export default ()=>null