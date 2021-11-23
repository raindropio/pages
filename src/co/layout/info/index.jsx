import s from './index.module.css'
import { Fragment } from 'react'

export default function Info({ className='', children, divider='·', ...etc }) {
    return (
        <section {...etc} className={s.info+' '+className}>
            {Array.isArray(children) ?
                children.filter(child=>!!child).map((child, i, { length })=>(
                    <Fragment key={child.key||i}>
                        {child}
                        {i<length-1 && <span className={s.divider}>{divider}</span>}
                    </Fragment>
                ))
                : children
            }
        </section>
    )
}