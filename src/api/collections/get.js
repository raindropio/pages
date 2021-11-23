import { API_ENDPOINT } from '~config/api'
import { FetchError } from '../errors'

export async function getByUserId(userId, options={}) {
    const params = new URLSearchParams(options)

    const res = await fetch(`${API_ENDPOINT}/collections/${String(userId)}?${params.toString()}`)
    if (!res.ok)
        throw new FetchError(res.status, res.statusText)

    const { result, items } = await res.json()

    if (!result)
        return []

    return items
}

export async function getByUserName(user_name, options={}) {
    const params = new URLSearchParams(options)

    const res = await fetch(`${API_ENDPOINT}/collections/username/${String(user_name)}?${params.toString()}`)
    if (!res.ok)
        throw new FetchError(res.status, res.statusText)

    const { result, items } = await res.json()

    if (!result)
        return []

    return items
}