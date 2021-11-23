import s from './index.module.css'

export function Fields({ className='', inset=false, ...etc }) {
    return (
        <div 
            {...etc}
            className={s.fields+' '+className}
            data-inset={inset} />
    )
}