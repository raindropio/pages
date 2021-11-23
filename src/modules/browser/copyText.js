export async function copyText(text) {
    if ('permissions' in navigator == false)
        return
        
    await navigator.permissions.query({name: 'clipboard-write'})
    await navigator.clipboard.writeText(text)
}