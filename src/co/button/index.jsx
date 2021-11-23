import s from './index.module.css'
import { forwardRef } from 'react'
import Icon, { Logo, Avatar } from '~co/icon'

export * from './select'
export * from './share'

export function Base({ as='a', className='', variant, color, size, bold=false, disabled=false, inline=true, forwardedRef, ...props }) {
    const Component = as

    return (
        <Component 
            {...props}
            ref={forwardedRef}
            className={s.button+' '+className}
            data-variant={disabled ? 'disabled' : (variant || 'regular')}
            data-color={color || 'secondary'}
            data-size={size || 'regular'}
            data-bold={bold}
            data-inline={inline}
            data-single-icon={props.children?.type == Icon || props.children?.type == Logo || props.children?.type == Avatar} />
    )
}

export default forwardRef((props, ref) => {
    return <Base {...props} forwardedRef={ref} />
})

export function Buttons({ className='', tight=false, ...etc }) {
    return (
        <div {...etc} data-tight={tight} className={s.buttons+' '+className} />
    )
}