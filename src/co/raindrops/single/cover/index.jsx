import s from './index.module.css'
import Picture from '~co/picture'
import { FAVICON_ENDPOINT } from '~config/api'

let sizes = {
    default: {
        width: 92,
        height: 69,
        mode: 'crop'
    },
    simple: {
        width: 24,
        height: 24
    },
    grid: {
        ar: '16:9',
        width: 350,
        mode: 'crop'
    },
    masonry: {
        width: 350
    }
}

export default function RaindropsCover({ className='', collection: { view }, item: { cover, link, domain, title } }) {
    return (
        <Picture 
            {...(sizes[view] || sizes.default)}
            endpoint={view == 'simple' ? FAVICON_ENDPOINT : undefined}
            className={s.cover+' '+s[view]+' '+className}
            src={view == 'simple' ? domain : cover || link}
            alt={title} />
    )
}