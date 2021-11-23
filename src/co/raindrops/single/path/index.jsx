import s from './index.module.css'
import Collection from '~co/collections/compact/single'

export default function RaindropsSinglePath({ target, item, user, collections }) {
    const parent = (collections||[])
        .find(({_id})=>_id == item.collection?.$id)

    if (!parent)
        return null

    return (
        <Collection 
            item={parent}
            user={user}
            target={target}
            className={s.path}
            prefetch={false} />
    )
}