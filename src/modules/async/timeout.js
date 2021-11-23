export function timeout(promise, ms) {
    let id;
    let timeout = new Promise((resolve) => {
        id = setTimeout(() => {resolve(true)}, ms)
    })
  
    return Promise.race([
        promise,
        timeout
    ]).then((result) => {
        clearTimeout(id)
        return result
    })
}