export async function getData({ username }) {
    const res = await fetch(`https://api.raindrop.io/v1/user/name/${username}`)
    const json = await res.json()
    return json.user
}

export default function User({ _id, name }) {
    return <b>User {_id} {name}</b>
}