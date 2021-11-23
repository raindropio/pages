import s from './index.module.css'
import Single from './single'

export default function CollectionsListing({ items, user, target }) {
    if (!items.length)
        return null

    return (
        <nav className={s.listing}>
            {items.map(item=>(
                <Single 
                    key={item._id}
                    target={target}
                    item={item}
                    user={user}
                    href={`/${user.name}/${item.slug}-${item._id}`} />
            ))}
        </nav>
    )
}