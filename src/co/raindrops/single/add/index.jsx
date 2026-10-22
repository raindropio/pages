import s from './index.module.css'
import links from '~config/links'
import { useCallback } from 'react'
import Button from '~co/button'
import Icon from '~co/icon'

export default function RaindropsSingleAdd({ item: { link, title } }) {
    const onClick = useCallback(e=>{
        e.preventDefault()

        const width = 420;
        const height = 600;
        const left = parseInt((screen.width/2)-(width/2));
        const top = parseInt((screen.height/2)-(height/2)); 

        window.open(e.currentTarget.href, '', `width=${width},height=${height},top=${top},left=${left},menubar=no,status=no,titlebar=no`)
    }, [])

    return (
        <Button 
            className={s.add} 
            color='accent'
            onClick={onClick}
            target='_blank'
            href={links.app.index+'/add?'+new URLSearchParams({
                link,
                title
            })}
            title='Add to Raindrop.io'>
            <Icon name='star' variant='fill' size='small' />
        </Button>
    )
}