export function compactDomain(domain) {
    try{
        const { hostname } = new URL(`https://${domain}`)
        const parts = hostname.split('.')
        return `${parts[parts.length-2]}.${parts[parts.length-1]}`
    } catch(e) {
        console.log(e)
        return 'unknown'
    }
}