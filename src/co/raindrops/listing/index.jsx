import s from './index.module.css'
import Single from '../single'

export * from './useInfiniteScroll'

export default function RaindropsListing({ target, items=[], collection, collections, user, options }) {
    return (
        <section className={s.listing+' '+s[collection.view]}>
            <section className={s.items}>
                {items.map(item=>(
                    <Single 
                        key={item._id}
                        target={target}
                        collection={collection}
                        collections={collections}
                        user={user}
                        item={item}
                        options={options} />
                ))}
            </section>
        </section>
    )
}