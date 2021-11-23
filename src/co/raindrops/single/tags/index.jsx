import Tag from './tag'

export default function RaindropsSingleTags({ target, item: { tags } }) {
    if (!(tags||[]).length)
        return null

    return tags.map(_id=>
        <Tag 
            key={_id}
            target={target}
            _id={_id} />
    )
}