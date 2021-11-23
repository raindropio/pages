import s from './index.module.css'
import { createContext, useMemo, useCallback } from 'react'

export const Context = createContext({
    values: {}
})

export default function Form({ className='', value, onChange, onSubmit, ...etc }) {
    const onFieldChange = useCallback(e=>{
        const elem = e.currentTarget
        const fieldName = elem.name
        const fieldValue = elem.type == 'checkbox' ? (elem.checked||false) : elem.value

        onChange({
            ...value,
            [fieldName]: fieldValue
        })
    }, [value, onChange])

    const onFormSubmit = useCallback(e=>{
        e.preventDefault()
        if (onSubmit) onSubmit(e)
    }, [onSubmit])

    const context = useMemo(()=>{
        let values = {...value}
        for(const i in values)
            if (values[i]=='true')
                values[i] = true
            else if (values[i]=='false')
                values[i] = false

        return {
            values,
            onChange: onFieldChange
        }
    }, [value])

    return (
        <Context.Provider value={context}>
            <form 
                onSubmit={onFormSubmit}
                {...etc}
                className={s.form+' '+className} />
        </Context.Provider>
    )
}