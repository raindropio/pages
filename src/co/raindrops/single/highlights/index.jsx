import s from './index.module.css'
import Item from './highlight'

export default function RaindropsSingleHighlights({ className='', item: { highlights=[] } }) {
    if (!highlights.length)
        return null

    return (
        <div className={s.highlights+' '+className}>
            {highlights.map(item=>(
                <Item 
                    key={item._id}
                    className={s.item}
                    {...item} />
            ))}
        </div>
    )
}