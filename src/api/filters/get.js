import { API_ENDPOINT } from '~config/api'
import { FetchError } from '../errors'
import { optionsToQueryString } from '~api/raindrops/get'

export async function get(id, _options) {
    const { sort, perpage, ...options } = _options
    const res = await fetch(`${API_ENDPOINT}/filters/${id}?${optionsToQueryString(options)}`)
    if (!res.ok)
        throw new FetchError(res.status, res.statusText)

    const { result, ...items } = await res.json()

    if (!result)
        return []

    return items
}