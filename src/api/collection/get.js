import { API_ENDPOINT } from '~config/api'
import { FetchError } from '../errors'

export async function get(id) {
    if (typeof id == 'undefined')
        throw new FetchError(404)

    const res = await fetch(`${API_ENDPOINT}/collection/${id}`)
    if (!res.ok)
        throw new FetchError(res.status, res.statusText)
        
    const { result, item } = await res.json()

    if (!result)
        return null

    return item
}