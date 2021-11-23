import { Avatar } from '~co/icon'
import Button from '~co/button'

export default function RaindropsSingleCreator({ item: { creatorRef }, user, target }) {
    if (!creatorRef ||
        creatorRef._id == user._id)
        return null

    return (
        <Button 
            href={`/${creatorRef.name}`}
            prefetch={false}
            target={target}
            size='small'
            variant='flat'
            title={`Added by ${creatorRef.name}`}>
            {!!creatorRef.avatar && (
                <Avatar
                    src={creatorRef.avatar}
                    size='small' />
            )}
            
            {creatorRef.name}
        </Button>
    )
}