import { API_ENDPOINT } from '~config/api'
import { FetchError } from '../errors'

async function toFetchError(res) {
    let reason = res.statusText
    if (res.headers.get('content-type')?.includes('json')) {
        const { error } = await res.json()
        if (typeof error == 'string') reason = error
    }
    return new FetchError(res.status, reason)
}

//id or name
export async function getById(id, { signal } = {}) {
    const res = await fetch(`${API_ENDPOINT}/user/${String(id)}`, { signal })
    if (!res.ok)
        throw await toFetchError(res)

    const { result, user } = await res.json()

    if (!result)
        return null

    return user
}

export async function getByName(name, { signal } = {}) {
    const res = await fetch(`${API_ENDPOINT}/user/name/${String(name)}`, { signal })
    if (!res.ok)
        throw await toFetchError(res)

    const { result, user } = await res.json()

    if (!result)
        return null

    return user
}