import s from './index.module.css'
import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react'
import { PropTypes } from 'prop-types'
import { Portal } from 'react-portal'
import debounce from '~modules/format/callback/debounce'

import Context from './context'

//save mouse position
let _mousePos = { x:-1, y:-1 }
if (typeof document != 'undefined')
    document.documentElement.addEventListener('mousedown', function(e){
        _mousePos = { x: e.pageX, y: e.pageY }
    })

function Popover({ pin, innerRef, className='', children, dataKey, closable=true, stretch=false, onClose, ...etc }) {
    const _container = useRef(null)

    const context = useMemo(()=>({
        close: ()=>{onClose && onClose()}
    }), [onClose])

    //position
    const [style, setStyle] = useState({ opacity: 0 })

    const place = useCallback(
        ()=>{
            if (!_container.current) return

            let y, x

            //use current mouse position
            y = _mousePos.y
            x = _mousePos.x

            //pin to active element
            if (pin && pin.current)
            try{
                const { left, top, height } = pin.current.getBoundingClientRect()
                y = top + height
                x = left
            }catch(e){}

            //prevent showing outside of viewport
            const { innerWidth, innerHeight } = window
            const { offsetWidth, offsetHeight } = _container.current

            if (x + offsetWidth > innerWidth)
                x = innerWidth - offsetWidth - 16
            if (x < 0)
                x = 16

            if (!stretch && y + offsetHeight > innerHeight)
                y = innerHeight - offsetHeight - 16

            if (y < 0)
                y = 16

            setStyle({
                opacity: 1,
                '--top': parseInt(y)+'px',
                '--left': parseInt(x)+'px'
            })
        },
        [_container, pin, stretch, setStyle]
    )
    const placeDebounced = useMemo(()=>
        debounce(place, 100, { leading: true, maxWait: 1000 }),
        [place]
    )

    //update position on some events
    useEffect(()=>{
        placeDebounced()
    }, [place, dataKey])

    //click outside
    useEffect(()=>{
        const onBodyMouseDown = e=>{
            if (!_container.current) return
            if (!closable) return

            if (!_container.current.contains(e.target))
                context.close()
        }

        setTimeout(()=>window.addEventListener('mousedown', onBodyMouseDown))
        return ()=>window.removeEventListener('mousedown', onBodyMouseDown)
    }, [_container, context, closable])

    //global hotkeys
    useEffect(()=>{
        const onWindowKeyDown = e=>{
            switch(e.key) {
                case 'Escape':
                    e.preventDefault()
                    e.stopPropagation()
                    return context.close()
            }
        }

        window.addEventListener('keydown', onWindowKeyDown)
        return ()=>window.removeEventListener('keydown', onWindowKeyDown)
    }, [_container, context])

    //window scroll & resize
    useEffect(()=>{
        window.addEventListener('scroll', placeDebounced)
        window.addEventListener('resize', placeDebounced)
        return ()=>{
            window.removeEventListener('scroll', placeDebounced)
            window.removeEventListener('resize', placeDebounced)
        }
    }, [placeDebounced])

    if (innerRef)
        innerRef(_container)

    return (
        <Portal>
            <Context.Provider value={context}>
                <div 
                    {...etc}
                    ref={_container}
                    className={className+' '+s.wrap}
                    style={style}
                    data-closable={closable}
                    data-stretch={stretch}>
                    <div className={s.body}>
                        {children}
                    </div>
                </div>
            </Context.Provider>
        </Portal>
    )
}

Popover.propTypes = {
    pin: PropTypes.any,
    innerRef: PropTypes.any,

    className: PropTypes.string,
    dataKey: PropTypes.any,

    closable: PropTypes.bool,
    stretch: PropTypes.bool,
    onClose: PropTypes.func
}

export default Popover