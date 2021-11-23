import s from './index.module.css'

export default function Badge({ className='', variant, ...etc }) {
    return (
        <div 
            {...etc} 
            className={s.badge+' '+className}
            data-variant={variant||'info'} />
    )
}