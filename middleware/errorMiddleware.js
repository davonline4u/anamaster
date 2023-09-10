
const notfound = (req, res, next) => {
    const error = new Error(`not found ${req.originalUrl}`)
    res.status(404)
    next(error)

}

const errorHandler = (err, req, res, next)=> {
    let statusCode = res.status === 200 ? 500 : res.statusCode
    let message = err.message

    if(err.name === "castError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = `Resource not found`
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })


}

    export {
        notfound,
        errorHandler
    }