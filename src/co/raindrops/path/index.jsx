import Page from '~co/page'
import { Avatar } from '~co/icon'
import Badge from '~co/badge'
import { useParents } from '~co/collections/hooks'

export default function RaindropsPath({ collections, collection, user, self }) {
    const parents = useParents(collections, collection, self)

    const path = [
        <Page.Path.Part 
            key='user'
            href={`/${user.name}`}
            bold
            prefetch={false}>
            {!!user.avatar && <Avatar src={user.avatar} alt={user.name} />}
            
            {user.name}

            {!!user.pro && (
                <Badge variant='disabled'>Pro</Badge>
            )}
        </Page.Path.Part>,

        ...parents.map(({ title, slug, _id })=>(
            <Page.Path.Part
                key={_id}
                href={`/${user.name}/${slug}-${_id}`}
                prefetch={false}>
                {title}
            </Page.Path.Part>
        ))
    ]

    return (
        <Page.Path.Wrap>
            {path}
        </Page.Path.Wrap>
    )
}