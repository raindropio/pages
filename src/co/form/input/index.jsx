import s from './index.module.css'
import { useContext } from 'react'
import { Context } from '../form'

export function Input({ className='', ...etc }) {
    const { values, onChange } = useContext(Context)

    return (
        <input
            type='text' 
            {...etc}
            value={values[etc.name]}
            onChange={onChange}
            className={s.input+' '+className} />
    )
}