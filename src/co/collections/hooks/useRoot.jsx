import { useMemo } from 'react'
import sortBy from 'lodash-es/sortBy'

export function useRoot(items) {
    return useMemo(()=>
        sortBy(
            items.filter(({parent})=>{
                if (parent)
                    return !items.find(({_id})=>_id==parent.$id)

                return true
            }),
            ['title']
        ),
        items
    )
}