import axios from 'axios';

export function getPost(postId) {
    return axios.get('https://localhost:8000/test/' + postId);
}

export function postSignUp() {
    return axios.post('https://localhost:3000/signup/');
}