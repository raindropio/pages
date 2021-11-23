export function parseQueryParams(string) {
    const obj = Object.fromEntries(new URLSearchParams(string||''))
    for(const i in obj)
        try{
            //do not parse strings with " or '
            if (typeof obj[i] == 'string' && /^("|').+("|')$/.test(obj[i].trim()))
                obj[i] = obj[i]
            else
                obj[i] = JSON.parse(obj[i])
        }catch(e){}

    return obj
}