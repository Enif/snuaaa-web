import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export function postSignUp(data) {
    return axios.post('http://localhost:8080/api/signup/', data);
}

export function postLogIn(data) {
    return axios.post('http://localhost:8080/api/login/', data)
}

export function action1(data) {
    return axios.post('http://localhost:8080/api/action/', data)
}