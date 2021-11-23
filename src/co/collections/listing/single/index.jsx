import s from './index.module.css'
import { useMemo } from 'react'
import colorConvert from 'color-convert'

import Cover from '../../cover'

export default function CollectionsSingle({ item, user, target }) {
    const folderStyle = useMemo(()=>
        item.color ? {
            '--bg-rgb': colorConvert.hex.rgb(item.color.replace('#',''))
        } : undefined,
        [item.color]
    )

    return (
        <a 
            href={`/${user.name}/${item.slug}-${item._id}`}
            data-prefetch={false}
            target={target}
            className={s.single}>
            <span 
                className={s.folder}
                data-custom-bg={folderStyle ? true : false}
                style={folderStyle}>
                <Cover 
                    {...item} 
                    className={s.cover}
                    size='xlarge' />
            </span>

            <span className={s.title}>
                {item.title}
            </span>
        </a>
    )
}