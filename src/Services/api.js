import  axios from 'axios';
import config from './config';

const request = (second) => { 
    return axios.request(config)
 };

export const getRequest = (params) => { 
    const customConfig = {
        ...config,
        method: 'get',
        params
    };
    
    return request(customConfig);
};

export const postRequest = (params, body) => { 

    const customConfig = {
        ...config,
        method: 'post',
        params,
        body
    };

    return request(customConfig);
 };

