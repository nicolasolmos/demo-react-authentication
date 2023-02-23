const HashUtilities = require('../utils');

async function SignUpController(request, response) {
    try {
        const { username, password } = request.body;

        const newHash = await HashUtilities.hashPassword(password);
        await HashUtilities.storeHash(newHash, username);
        response.status(201).end('Account created');
        
    } catch (error) {
        response.status(500).end('An error ocurred while retrieving creating the user account');
    }
}

module.exports = {
    SignUpController
};