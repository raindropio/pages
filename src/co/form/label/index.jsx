import s from './index.module.css'

export function Label({ className='', ...etc }) {
    return (
        <div 
            {...etc}
            className={s.label+' '+className} />
    )
}