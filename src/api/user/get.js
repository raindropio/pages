import { API_ENDPOINT } from '~config/api'
import { FetchError } from '../errors'

//id or name
export async function getById(id) {
    const res = await fetch(`${API_ENDPOINT}/user/${String(id)}`)
    if (!res.ok)
        throw new FetchError(res.status, res.statusText)

    const { result, user } = await res.json()

    if (!result)
        return null

    return user
}

export async function getByName(name) {
    const res = await fetch(`${API_ENDPOINT}/user/name/${String(name)}`)
    if (!res.ok)
        throw new FetchError(res.status, res.statusText)

    const { result, user } = await res.json()

    if (!result)
        return null

    return user
}