import { API_ENDPOINT } from '~config/api'
import { FetchError } from '../errors'
import { apiFetch } from '../fetch'

export async function get(id, { signal } = {}) {
    if (typeof id == 'undefined')
        throw new FetchError(404)

    const res = await apiFetch(`${API_ENDPOINT}/collection/${id}`, { signal })
    if (!res.ok)
        throw new FetchError(res.status, res.statusText)
        
    const { result, item } = await res.json()

    if (!result)
        return null

    item.slug = item.slug || 'a'

    return item
}