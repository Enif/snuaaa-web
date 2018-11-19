import axios from 'axios';
import { SERVER_URL } from '../common/environment'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export function updateToken() {
    return axios.get(SERVER_URL + 'api/check')
}

export function postSignUp(data) {
    return axios.post(SERVER_URL + 'api/signup/', data);
}

export function postLogIn(data) {
    return axios.post(SERVER_URL + 'api/login/', data);
}

export function getUserInfo(data) {
    return axios.get(SERVER_URL + 'api/userinfo/', data);
}

export function getUserProfile(data) {
    return axios.get(SERVER_URL + 'api/userinfo/profile', data)
}

export function retrievePost(postNo) {
     return axios.get(SERVER_URL + `api/post/${postNo}`);
}

export function retrievePosts(data) {
    return axios.get(SERVER_URL + 'api/post/', data);
}

export function retrievePostsInBoard(boardNo) {
    return axios.get(SERVER_URL + `api/board/${boardNo}`);
}

export function createPost(data) {
    return axios.post(SERVER_URL + 'api/post/', data);
}

export function retrieveAlbumsInPhotoBoard(boardNo) {
    return axios.get(SERVER_URL + `api/photoboard/${boardNo}`)
}

export function createAlbum(boardNo, data) {
    return axios.post(SERVER_URL + `api/photoboard/${boardNo}`, data)
}

export function createPhotos(albumNo, data) {
    return axios.post(SERVER_URL + `api/album/${albumNo}`, data)
}

export function retrievePhotosInAlbum(albumNo) {
    return axios.get(SERVER_URL + `api/album/${albumNo}`)
}

export function retrieveSoundBox() {
    return axios.get(SERVER_URL + `api/soundbox`);
}