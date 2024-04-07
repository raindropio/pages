import s from './index.module.css'
import { useMemo } from 'react'
import Single from '../single'

export * from './useInfiniteScroll'

export default function RaindropsListing({ target, items=[], collection, collections, user, options }) {
    const hide = useMemo(()=>[
        ...(options?.hide||'').split(',').map(h=>h.trim()),
        ...(user.config?.raindrops_hide||[])
            .filter(h=>h.startsWith(collection.view+'_'))
            .map(h=>h.replace(collection.view+'_', ''))
    ], [options?.hide, collection.view, user.config])

    const defaultTarget = useMemo(()=>
        user?.config?.raindrops_click == 'new_tab' ? '_blank' : '',
        [user?.config?.raindrops_click]
    )

    return (
        <section className={s.listing+' '+s[collection.view]}>
            <section className={s.items}>
                {items.map(item=>(
                    <Single 
                        key={item._id}
                        target={target || defaultTarget}
                        collection={collection}
                        collections={collections}
                        user={user}
                        item={item}
                        options={{...options, hide}} />
                ))}
            </section>
        </section>
    )
}