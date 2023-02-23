const HashUtilities = require('../utils')

const AuthenticationMiddleware = async (request, response, next) => {

    const token = request.headers.authorization;

    if (!token) {
        return next(Error('Missing token'));
    }

    HashUtilities.verifyToken(token).then(result => {
        if(!result) {
            return next(Error('Invalid token'));
        }

        console.log('TOKEN VERIFIED');
        return next();
    }).catch(error => {
        return next(error);
    })
}

module.exports = {
    AuthenticationMiddleware
};
