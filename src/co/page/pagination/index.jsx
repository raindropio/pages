import s from './index.module.css'
import { useEffect, useRef, useCallback, useState } from 'react'
// import { useRouter } from 'next/router'

import Button from '~co/button'
import Icon from '~co/icon'

export default function Pagination({ count, perpage, force=false, ...etc }) {
    return null
    const router = useRouter()

    const _pagesRef = useRef(null)
    const page = parseInt(etc.page)||0
    const pagesCount = Math.ceil(count/perpage)

    useEffect(()=>{
        const elem = document.getElementById(`page-${page}`)
        if (elem){
            _pagesRef.current.scrollLeft = elem.offsetLeft - (_pagesRef.current.clientWidth / 2)
        }
    }, [page])

    const getHref = useCallback((page)=>{
        const options = new URLSearchParams(router.query.options)
        options.set('page', page)
    
        return {
            pathname: router.pathname.endsWith('[options]') ? router.pathname : `${router.pathname}/[options]`,
            query: {
                ...router.query,
                options: options.toString()
            }
        }
    }, [router])

    if (!force && pagesCount<=1)
        return null

    let pages = []

    if (pagesCount>1){
        let from = 0
        let to = Math.min(pagesCount, 100)

        for(var i=from;i<=to-1;i++)
            pages.push(
                <Button
                    key={i}
                    id={`page-${i}`}
                    href={getHref(i)}
                    className={s.page}
                    variant={page == i ? 'active' : 'flat'}
                    prefetch={false}>
                    {i+1}
                </Button>
            )
    }

    return (
        <section 
            className={s.pagination}
            data-sticky={page > 0}>
            <div className={s.inner}>
                <nav 
                    ref={_pagesRef}
                    className={s.pages}
                    data-page={page}>
                    {pages}
                    <div className={s.space} />
                </nav>

                <nav className={s.navigation}>
                    <Button 
                        href={getHref(page-1)}
                        disabled={!page}
                        title='Previous page'
                        prefetch={false}>
                        <Icon name='arrow-left' />
                    </Button>

                    <Button 
                        href={getHref(page+1)}
                        disabled={page >= pagesCount-1 && force != 'next'}
                        title='Next page'>
                        <Icon name='arrow-right' />
                    </Button>
                </nav>
            </div>
        </section>
    )
}