import s from './index.module.css'
import Icon from '~co/icon'

export default function RaindropsSingleType({ className='', item: { type } }) {
    let iconName = ''

    switch (type) {
        case 'video': iconName = 'play'; break
        case 'document': iconName = 'file-text'; break
        case 'audio': iconName = 'headphone'; break
    }

    if (!iconName)
        return null

    return (
        <div className={s.type+' '+className}>
            <div className={s.bg}>
                <Icon 
                    className={s.icon}
                    name={iconName}
                    variant='fill'
                    size='small' />
            </div>
        </div>
    )
}