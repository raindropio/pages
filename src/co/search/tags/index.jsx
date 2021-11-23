import s from './index.module.css'
import sortBy from 'lodash-es/sortBy'
import Tag from './tag'
import { Buttons } from '~co/button'

export default function SearchTags({ tags }) {
    const sorted = sortBy(tags, ['_id'])

    if (!sorted.length)
        return null

    return (
        <Buttons className={s.tags}>
            {sorted.map(tag=>(
                <Tag 
                    key={tag._id}
                    {...tag} />
            ))}
        </Buttons>
    )
}