import s from './index.module.css'
import Icon from '~co/icon'
import FileTextIcon from 'remixicon/icons/Document/file-text-fill.svg?react'
import HeadphoneIcon from 'remixicon/icons/Media/headphone-fill.svg?react'
import PlayIcon from 'remixicon/icons/Media/play-fill.svg?react'

const icons = {
    video: PlayIcon,
    document: FileTextIcon,
    audio: HeadphoneIcon
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
                    as={icon}
                    size='small' />
            </div>
        </div>
    )
}