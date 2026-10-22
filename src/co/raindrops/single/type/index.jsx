import s from './index.module.css'
import Icon from '~co/icon'

const icons = {
    video: 'play',
    document: 'file-text',
    audio: 'headphone'
}

export default function RaindropsSingleType({ className='', item: { type } }) {
    const icon = icons[type]

    if (!icon)
        return null

    return (
        <div className={s.type+' '+className}>
            <div className={s.bg}>
                <Icon 
                    className={s.icon}
                    name={icon}
                    variant='fill'
                    size='small' />
            </div>
        </div>
    )
}