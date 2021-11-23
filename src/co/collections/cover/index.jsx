import s from './index.module.css'
import Icon, { Image } from '~co/icon'

export default function CollectionCover({ className='', cover, title, size, fallback=true }) {
    if (!Array.isArray(cover) || 
        !cover.length)
        return fallback ? (
            <Icon 
                className={s.fallback+' '+className}
                name='folder'
                size={size} />
        ) : null

    return (
        <Image 
            className={className}
            src={cover[0]}
            alt={title}
            size={size} />
    )
}