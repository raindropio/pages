import React from 'react'

import { format, formatRelative, isToday, isYesterday } from 'date-fns'
import { parseDate } from './parse'

export const shortDate = (original) => {
    let d
    try{ d = parseDate(original) } catch(e){}

    try{
        if (isToday(d) || isYesterday(d))
            return formatRelative(d, Date.now())
    }catch(e){}

    try{
        return format(d, 'PP')
    }catch(e){}

    return ''
}

export const ShortDate = React.memo(
    function({ date }) {
        return <time dateTime={date}>{shortDate(date)}</time>
    }
)
