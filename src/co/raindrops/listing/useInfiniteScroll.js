import { useState, useEffect } from 'react'
import Api from '~api'

export function useInfiniteScroll(collection, raindrops, options) {
    const [items, setItems] = useState(()=>raindrops.items)

    useEffect(()=>{
        let loading = false
        let noMore = false
        let page = options.page || 0

        async function onScroll() {
            if (loading || noMore) return
            if (typeof window == 'undefined') return
            if (window.scrollY + window.innerHeight*2 < document.body.scrollHeight) return
            
            loading = true
            page++

            const { items } = await Api.raindrops.get(collection._id, {
                ...options,
                page
            })

            if (items.length)
                setItems(prev=>[
                    ...prev,
                    ...items
                ])
            else
                noMore = true

            loading = false
        }

        window.addEventListener('scroll', onScroll)
        window.addEventListener('resize', onScroll)
        return ()=>{
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [])

    return items
}