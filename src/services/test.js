import axios from 'axios';

/* export function getPost(postId) {
    return axios.get('https://localhost:8000/test/' + postId);
}
*/
export function postSignUp(data) {
    return axios.post('http://localhost:8080/api/signup/', data);
}


export function getBooks() {
    return axios.get('http://localhost:8080/api/books');
}