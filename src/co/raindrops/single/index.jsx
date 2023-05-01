import s from './index.module.css'
import { Buttons } from '~co/button'
import { ShortDate } from '~modules/format/date'

import Info from '~co/layout/info'
import Cover from './cover'
import Path from './path'
import Tags from './tags'
import Important from './important'
import Creator from './creator'
import Type from './type'
import Add from './add'
import Highlights from './highlights'

export default function RaindropsSingle(props) {
    const { item, collection, target, options={} } = props

    return (
        <article
            className={s.single+' '+s[collection.view]}>
            <div className={s.item}>
                <Cover
                    {...props}
                    className={s.cover} />

                <Type
                    {...props}
                    className={s.type} />

                <div className={s.about}>
                    <div className={s.title}>
                        {item.title}
                    </div>

                    {!!item.excerpt && !options.hide?.includes('excerpt') && (
                        <div className={s.excerpt}>
                            {item.excerpt}
                        </div>
                    )}

                    <Highlights className={s.highlights} {...props} />

                    <Buttons tight className={s.filters}>
                        <Important {...props} />

                        {!options.hide?.includes('info') && !!(collection._id && item.collection?.$id != collection._id) && (
                            <Path {...props} />
                        )}

                        {!options.hide?.includes('tags') && (
                            <Tags {...props} />
                        )}
                    </Buttons>

                    {!options.hide?.includes('info') && (
                        <Info className={s.info}>
                            <Creator {...props} />
                            <span>{item.domain}</span>
                            <span><ShortDate date={item.created} /></span>
                        </Info>
                    )}
                </div>

                {!options.hide?.includes('add') && (
                    <Buttons className={s.actions}>
                        <Add {...props} />
                    </Buttons>
                )}
            </div>

            <a 
                target={target}
                href={item.link} 
                className={s.permalink}
                rel='nofollow'>
                {item.title}
            </a>
        </article>
    )
}