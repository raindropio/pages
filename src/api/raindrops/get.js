import { API_ENDPOINT } from '~config/api'
import { FetchError } from '../errors'

export function optionsToQueryString(options={}) {
    const params = new URLSearchParams(options)
    params.set('version', 2)

    //nested
    if (params.get('nested') === 'false')
        params.delete('nested')
    else
        params.set('nested', true)

    return params.toString()
}

export async function get(id, options={}) {
    const res = await fetch(`${API_ENDPOINT}/raindrops/${id}?${optionsToQueryString(options)}`)
    if (!res.ok)
        throw new FetchError(res.status, res.statusText)

    const { result, items, count=0 } = await res.json()

    if (!result)
        return {
            items: [],
            count: 0
        }

    return {
        items,
        count
    }
}