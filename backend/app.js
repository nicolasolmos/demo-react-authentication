const express = require('express');
const jose = require('jose');

const app = express();

app.use(express.json());

app.post('/login', async (request, response) => {
    try {
        const { username, password } = request.body;
        console.log('fdsafsd')
        const hardCodedUsername = 'NICOLAS';
        const hardCodedPassword = '123456';
        const key = new TextEncoder().encode(password);

        const token = await new jose.SignJWT({ username, login: true })
        .setProtectedHeader({ alg: 'HS256'})
        .sign(key)
        
        console.log(token);

        if(hardCodedPassword === password && hardCodedUsername === username) {
            response.status(200).end(JSON.stringify({
                token
            }));
        } else {
            response.status(401).end('BAD AUTHENTICATION');
        }

    } catch(error) {
        console.error(error);
        response.status(500).end();
    }
    
});

app.get('/ping', (request, response) => {
    response.end('pong');
});


app.listen(4000, () => {

    console.log('BACKEND LISTENING ON PORT 4000');
});
