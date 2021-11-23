import * as collection from './collection'
import * as user from './user'

const providers = [
    collection,
    user
]

export async function onBeforeRender({ url }) {
    const query = Object.fromEntries(new URL(url, 'http://localhost').searchParams)
    const destination = query.url

    let json

    for(const provider of providers){
        let valid = false

        try{ valid = provider.validateURL(destination) } catch(e) {}

        if (valid){
            json = await provider.default(destination)
            break
        }
    }

    if (json)
        return {
            pageContext: {
                json,
                headers: {
                    'Cache-Control': 'public,max-age=3600'
                }
            }
        }

    return {
        pageContext: {
            statusCode: 400,
            headers: {
                'Cache-Control': 'public,max-age=3600'
            }
        }
    }
}

export default ()=>null