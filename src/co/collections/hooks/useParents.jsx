import { useMemo } from 'react'

export function useParents(collections=[], collection, self) {
    return useMemo(()=>{
        const parents = []

        if (!collection)
            return parents

        const find = (findId)=>{
            const parent = collections.find(({_id})=>_id == findId)
            
            if (parent){
                parents.unshift(parent)

                if (parent.parent?.$id)
                    find(parent.parent.$id)
            }
        }
        find(collection.parent?.$id)

        if (self)
            parents.push(collection)

        return parents
    }, [collections, collection])
}