import axios, { AxiosRequestHeaders } from 'axios';
import ManipulatorToken from './untils/manipulate-token';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json; charset=utf-8',
    }
});

export function setDefaultHeader(
    headers :AxiosRequestHeaders
) {
    instance.defaults.headers.common = headers; 
}

export function addDefaultHeader(
    key :string, values :string|number|boolean
) {
    instance.defaults.headers.common[key] = values; 
}

export function authApi() {
    setDefaultHeader({
        Authorization: 'Bearer ' + ManipulatorToken.getToken() || '',
    })

    return instance;
}

export default instance;