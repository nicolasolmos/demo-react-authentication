import { postRequest } from './api';

const LoginService = async(username, password) => { 
    try {
        const res = await postRequest('/login')

    } catch(error) {

        console.error('Error while trying to log in');
    }
};


export default LoginService;