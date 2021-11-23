import s from './index.module.css'
import { useCallback, useContext } from 'react'
import { Context } from '../form'
import { Select as ButtonSelect } from '~co/button'

export function Select({ className='', ...etc }) {
    const { values, onChange } = useContext(Context)
    const selected = values[etc.name]
    const onSelectChange = useCallback(value=>{
        onChange({
            currentTarget: {
                name: etc.name,
                value
            }
        })
    }, [onChange])

    return (
        <ButtonSelect 
            color='regular'
            {...etc}
            selected={selected}
            onChange={onSelectChange}
            className={s.select+' '+className} />
    )
}