import s from './index.module.css'
import { useEffect, useState, useCallback, useRef } from 'react'
import { navigate } from 'vite-plugin-ssr/client/router'

import { useLinkFactory } from '~modules/router'
import Icon, { ActivityIndicator } from '~co/icon'
import Button from '~co/button'

export default function SearchField({ value='', placeholder='Search' }) {
    const getLink = useLinkFactory()

    const input = useRef(null)
    const [search, setSearch] = useState(()=>value)
    const [loading, setLoading] = useState(false)

    //on search change
    useEffect(()=>{
        setSearch(value)

        if (input.current)
            input.current.focus()
    }, [value])

    //on submit
    const onFormSubmit = useCallback(e=>{
        e.preventDefault()
        navigate(getLink({ search }))
    }, [search])

    const onFormClick = useCallback(e=>{
        input.current.focus()
    }, [input])

    const onResetClick = useCallback(e=>{
        e.preventDefault()
        navigate(getLink({ search: '' }))
    }, [])
    
    return (
        <form 
            onSubmit={onFormSubmit}
            className={s.form}
            onClick={onFormClick}>
            {loading ? (
                <ActivityIndicator
                    className={s.magnifier}
                    color='accent' />
            ) : (
                <Icon 
                    className={s.magnifier}
                    name='search' />
            )}

            <input
                ref={input}
                className={s.field}
                type='text'
                value={search}
                placeholder={placeholder}
                autoFocus
                onChange={e=>setSearch(e.target.value)} />

            {!!search && (
                <Button 
                    className={s.reset}
                    variant='flat'
                    onClick={onResetClick}>
                    <Icon name='close' />
                </Button>
            )}
        </form>
    )
}