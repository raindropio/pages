export class FetchError extends Error {
    constructor(status, message, ...params) {
        super(...params)
  
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, FetchError)
  
        this.name = 'FetchError'
        this.status = status
        this.message = message || status
        this.date = new Date()
    }
}