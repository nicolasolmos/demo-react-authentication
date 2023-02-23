require('dotenv').config();
const express = require('express');
const { LoginController } = require('./controllers/LoginController');
const { AuthenticationMiddleware } = require('./middleware/authenticationMiddleware');
const { SignUpController } = require('./controllers/SignUpController');
const ErrorMiddleware = require('./middleware/ErrorMiddleware');

const app = express();

app.use(express.json());

app.post('/login', LoginController);
app.post('/signup', SignUpController);

app.get('/ping', AuthenticationMiddleware, ErrorMiddleware.ErrorMiddleware, (request, response) => {
    response.end('pong');
});



app.listen(4000, () => {
    console.log('BACKEND LISTENING ON PORT 4000');
});
