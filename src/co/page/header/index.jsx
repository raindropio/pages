import s from './index.module.css'
import { useState, useEffect } from 'react'
import { Buttons } from '~co/button'

export default {
    Wrap: function({ children }) {
        const [pinned, setPinned] = useState(false)
    
        useEffect(()=>{
            let pinned = false
            const onScroll = function(e) {
                const changed = window.scrollY > 10

                if (pinned != changed){
                    pinned = changed
                    setPinned(changed)
                }
            }
    
            onScroll()
    
            window.addEventListener('scroll', onScroll)
            return ()=>window.removeEventListener('scroll', onScroll)
        }, [])
    
        return (
            <header 
                className={s.header}
                data-pinned={pinned}>
                <div className={s.inner}>
                    {children}
                </div>
            </header>
        )
    },

    Icon: function({ children }) {
        return (
            <div className={s.icon}>
                {children}
            </div>
        )
    },

    Title: function({ children }) {
        return (
            <h1 className={s.title}>
                {children}
            </h1>
        )
    },

    Buttons: function({ className='', ...etc }) {
        return (
            <Buttons {...etc} className={s.buttons+' '+className} />
        )
    }
}