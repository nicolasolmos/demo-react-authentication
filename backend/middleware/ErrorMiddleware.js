const ErrorMiddleware = (err, req, res, next) => { 
    return res.status(500).end('dsadsa')
}

module.exports = {
    ErrorMiddleware
};