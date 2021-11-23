import Button from '~co/button'
import Cover from '../cover'

export default function CollectionsCompactSingle({ item, user, ...etc }) {
    return (
        <Button
            {...etc}
            href={`/${user.name}/${item.slug}-${item._id}`}
            prefetch={false}>
            <Cover 
                {...item} 
                size='small'
                fallback={false} />

            {item.title}
        </Button>
    )
}