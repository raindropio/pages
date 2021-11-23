import { Buttons } from '~co/button'
import Single from './single'

export default function CollectionsCompact({ items, user }) {
    if (!items.length)
        return null

    return (
        <Buttons>
            {items.map(item=>(
                <Single
                    key={item._id}
                    item={item}
                    user={user} />
            ))}
        </Buttons>
    )
}