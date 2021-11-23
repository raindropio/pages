export function pause (ms){
    return new Promise(res=>{
        setTimeout(() => {
            res(true)
        }, ms);
    })
}