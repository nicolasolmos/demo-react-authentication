const HashUtilities = require('../utils');

async function LoginController (request, response) {
    try {
        const { username, password } = request.body;

        const passwordHash = await HashUtilities.hashPassword(password);
        const hashFoundByUsername = await HashUtilities.hashLookupByUsername(username);

        console.log('password hash', passwordHash)
        console.log('hashFoundByUsername hash', hashFoundByUsername)

        if (passwordHash === hashFoundByUsername) {
            HashUtilities.createLoginToken(username).then((token) => {
                response.status(200).end(JSON.stringify({
                    token
                }));
            })
        } else {
            response.status(401).end('Bad credentials');
        }
    } catch (error) {
        console.error(error);
        response.status(500).end('Internal Server Error');
    }
}

module.exports = {
    LoginController
};