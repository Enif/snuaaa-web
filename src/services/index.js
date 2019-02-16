import axios from 'axios';
import { SERVER_URL } from '../common/environment'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + (sessionStorage.getItem('token') || localStorage.getItem('token') );

export function updateToken() {
    return axios.get(SERVER_URL + 'api/check')
}

export function postSignUp(data) {
    return axios.post(SERVER_URL + 'api/signup/', data);
}

export function postLogIn(data) {
    return axios.post(SERVER_URL + 'api/login/', data);
}

export function retrieveUserInfo() {
    return axios.get(SERVER_URL + 'api/userinfo/');
}

export function retrievePostsInBoard(boardNo) {
    return axios.get(SERVER_URL + `api/board/${boardNo}`);
}

export function retrievePost(postNo) {
    return axios.get(SERVER_URL + `api/post/${postNo}`);
}

export function createPost(data) {
    return axios.post(SERVER_URL + 'api/post/', data);
}

export function createComment(postNo, data) {
    return axios.post(SERVER_URL + `api/post/${postNo}/comment`, data);
}

export function retrieveAlbumsInPhotoBoard(boardNo) {
    return axios.get(SERVER_URL + `api/photoboard/${boardNo}`)
}

export function createAlbum(boardNo, data) {
    return axios.post(SERVER_URL + `api/photoboard/${boardNo}/album`, data)
}

export function createPhotos(albumNo, data) {
    return axios.post(SERVER_URL + `api/album/${albumNo}/photo`, data)
}

export function retrieveAlbum(albumNo) {
    return axios.get(SERVER_URL + `api/album/${albumNo}`)
}

export function retrievePhotosInAlbum(albumNo) {
    return axios.get(SERVER_URL + `api/album/${albumNo}/photos`)
}

export function retrievePhoto(photoNo) {
    return axios.get(SERVER_URL + `api/photo/${photoNo}`)
}

export function retrieveSoundBox() {
    return axios.get(SERVER_URL + `api/soundbox`);
}

export function retrieveProfile(path) {
    return axios.get(SERVER_URL + `api/profile/${path}`)
}