import axios from 'axios';
import { SERVER_URL } from '../common/environment'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export function postSignUp(data) {
    return axios.post(SERVER_URL + 'api/signup/', data);
}

export function postLogIn(data) {
    return axios.post(SERVER_URL + 'api/login/', data);
}

export function getUserInfo(data) {
    return axios.get(SERVER_URL + 'api/userinfo/', data);
}

export function action1(data) {
    return axios.post(SERVER_URL + 'api/action/', data);
}