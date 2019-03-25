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

export function createPost(board_id, data) {
    return axios.post(SERVER_URL + `api/board/${board_id}/post`, data);
}

export function retrieveComments(parent_id) {
    return axios.get(SERVER_URL + `api/object/${parent_id}/comment`);
}

export function createComment(parent_id, data) {
    return axios.post(SERVER_URL + `api/object/${parent_id}/comment`, data);
}

export function retrieveAlbumsInPhotoBoard(board_id) {
    return axios.get(SERVER_URL + `api/photoboard/${board_id}/albums`)
}

export function retrieveAlbumsInPhotoBoardByCategory(board_id, ctg_id) {
    return axios.get(SERVER_URL + `api/photoboard/${board_id}/albums?category=${ctg_id}`)
}

export function createAlbum(boardNo, data) {
    return axios.post(SERVER_URL + `api/photoboard/${boardNo}/album`, data)
}

export function retrievePhotosInPhotoBoard(boardNo) {
    return axios.get(SERVER_URL + `api/photoboard/${boardNo}/photos`)
}

export function createPhotosInPhotoBoard(boardNo, data) {
    return axios.post(SERVER_URL + `api/photoboard/${boardNo}/photo`, data)
}

export function createPhotosInAlbum(albumId, data) {
    return axios.post(SERVER_URL + `api/album/${albumId}/photo`, data)
}

export function retrieveAlbum(albumId) {
    return axios.get(SERVER_URL + `api/album/${albumId}`)
}

export function retrievePhotosInAlbum(albumId) {
    return axios.get(SERVER_URL + `api/album/${albumId}/photos`)
}

export function retrievePhoto(photoId) {
    return axios.get(SERVER_URL + `api/photo/${photoId}`)
}

export function retrieveDocuments() {
    return axios.get(SERVER_URL + `api/document`)
}

export function retrieveDocumentsByGeneration(generation) {
    return axios.get(SERVER_URL + `api/document/generation/${generation}`)
}

export function createDocument(data) {
    return axios.post(SERVER_URL + `api/document`, data)
}

export function downloadDocument(docuId, index) {
    return axios.get(SERVER_URL + `api/document/${docuId}/download/${index}`)
}

export function retrieveSoundBox() {
    return axios.get(SERVER_URL + `api/soundbox`);
}
