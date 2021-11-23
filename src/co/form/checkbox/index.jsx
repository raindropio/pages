import s from './index.module.css'
import { useCallback, useContext } from 'react'
import { Context } from '../form'
import Icon from '~co/icon'

export function Checkbox({ className='', children, ...etc }) {
    const { values, onChange } = useContext(Context)
    const checked = values[etc.name]

    return (
        <label 
            data-checked={checked}
            className={s.label+' '+className}>
            <div className={s.checkbox}>
                <input
                    type='checkbox'
                    {...etc}
                    checked={checked}
                    onChange={onChange} />

                <Icon
                    name={checked ? 'checkbox' : 'checkbox-blank'}
                    variant={checked ? 'fill' : 'line'}
                    className={s.icon} />
            </div>

            <span className={s.title}>
                {children}
            </span>
        </label>
    )
}