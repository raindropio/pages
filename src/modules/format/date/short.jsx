import React from 'react'

import isToday from 'date-fns/isToday'
import isYesterday from 'date-fns/isYesterday'
import format from 'date-fns/format'
import formatRelative from 'date-fns/formatRelative'
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