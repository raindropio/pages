import { API_ENDPOINT } from '~config/api'
import { FetchError } from '../errors'
import { apiFetch } from '../fetch'

export async function getByUserId(userId, { signal } = {}) {
    const res = await apiFetch(`${API_ENDPOINT}/collections/${String(userId)}`, { signal })
    if (!res.ok)
        throw new FetchError(res.status, res.statusText)

    const { result, items } = await res.json()

    if (!result)
        return []

    return items
        .map(item=>({
            ...item,
            slug: item.slug || 'a'
        }))
}

export async function getByUserName(user_name, { signal } = {}) {
    const res = await apiFetch(`${API_ENDPOINT}/collections/username/${String(user_name)}`, { signal })
    if (!res.ok)
        throw new FetchError(res.status, res.statusText)

    const { result, items } = await res.json()

    if (!result)
        return []

    return items
        .map(item=>({
            ...item,
            slug: item.slug || 'a'
        }))
}