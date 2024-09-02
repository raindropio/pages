import s from './index.module.css'
import { useState } from 'react'
import sortBy from 'lodash-es/sortBy'
import Tag from './tag'
import Button, { Buttons } from '~co/button'

const COLLAPSED_TAGS = 15

export default function SearchTags({ tags }) {
    const [expandTags, setExpandTags] = useState(false)

    const sorted = sortBy(tags, ['_id'])

    if (!sorted.length)
        return null

    return (
        <Buttons className={s.tags}>
            {sorted.slice(0, expandTags ? -1 : COLLAPSED_TAGS).map(tag=>(
                <Tag 
                    key={tag._id}
                    {...tag} />
            ))}

            {sorted.length > COLLAPSED_TAGS && (
                <Button variant='ghost' onClick={()=>setExpandTags(!expandTags)}>
                    Show {expandTags?'less':'all'} tags…
                </Button>
            )}
        </Buttons>
    )
}