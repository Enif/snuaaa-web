import axios from 'axios';
import { SERVER_URL } from '../common/environment'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + (sessionStorage.getItem('token') || localStorage.getItem('token') );

export function updateToken() {
    return axios.get(SERVER_URL + 'api/check')
}

export function postSignUp(data) {
    return axios.post(SERVER_URL + 'api/signup/', data);
}
//GM modified
export function duplicateCheck(data) {
    return axios.post(SERVER_URL + `api/signup/dupcheck`, data);
}

export function postLogIn(data) {
    return axios.post(SERVER_URL + 'api/login/', data);
}

export function retrieveUserInfo() {
    return axios.get(SERVER_URL + 'api/userinfo');
}

export function updateUserInfo(data) {
    return axios.patch(SERVER_URL + 'api/userinfo', data);
}

export function deleteUserInfo() {
    return axios.delete(SERVER_URL + 'api/userinfo');
}

export function retrieveUserPosts() {
    return axios.get(SERVER_URL + 'api/userinfo/posts');
}

export function retrieveBoardInfo(board_id) {
    return axios.get(SERVER_URL + `api/board/${board_id}`);
}

export function retrievePostsInBoard(board_id) {
    return axios.get(SERVER_URL + `api/board/${board_id}/posts`);
}

export function retrieveTagsInBoard(board_id) {
    return axios.get(SERVER_URL + `api/board/${board_id}/tags`);
}

export function retrievePost(post_id) {
    return axios.get(SERVER_URL + `api/post/${post_id}`);
}

export function updatePost(post_id, data) {
    return axios.patch(SERVER_URL + `api/post/${post_id}`, data);
}

export function deletePost(post_id) {
    return axios.delete(SERVER_URL + `api/post/${post_id}`);
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
//GM modified 
export function updateComment(comment_id, data) {
    return axios.patch(SERVER_URL + `api/comment/${comment_id}`, data);
}

export function deleteComment(comment_id) {
    return axios.delete(SERVER_URL + `api/comment/${comment_id}`);
}

export function likeObject(object_id) {
    return axios.post(SERVER_URL + `api/object/${object_id}/like`);
}

export function retrieveAlbumsInPhotoBoard(board_id) {
    return axios.get(SERVER_URL + `api/photoboard/${board_id}/albums`)
}

export function retrieveAlbumsInPhotoBoardByCategory(board_id, ctg_id) {
    return axios.get(SERVER_URL + `api/photoboard/${board_id}/albums?category=${ctg_id}`)
}

export function createAlbum(board_id, data) {
    return axios.post(SERVER_URL + `api/photoboard/${board_id}/album`, data)
}

export function retrievePhotosInPhotoBoard(board_id) {
    return axios.get(SERVER_URL + `api/photoboard/${board_id}/photos`)
}

export function createPhotosInPhotoBoard(board_id, data) {
    return axios.post(SERVER_URL + `api/photoboard/${board_id}/photos`, data)
}

export function retrievePhotosInPhotoBoardByTag(board_id, tags) {
    let tagUrl = '';
    tags.forEach((tag) => {
        if(!tagUrl) {
            tagUrl += `tag=${tag}`
        }
        else {
            tagUrl += `&tag=${tag}`
        }
    })
    return axios.get(SERVER_URL + `api/photoboard/${board_id}/photos?${tagUrl}`)
}

export function createPhotosInAlbum(albumId, data) {
    return axios.post(SERVER_URL + `api/album/${albumId}/photos`, data)
}

export function retrieveAlbum(albumId) {
    return axios.get(SERVER_URL + `api/album/${albumId}`)
}

export function retrievePhotosInAlbum(albumId) {
    return axios.get(SERVER_URL + `api/album/${albumId}/photos`)
}

export function retrievePhoto(photo_id) {
    return axios.get(SERVER_URL + `api/photo/${photo_id}`)
}

export function updatePhoto(photo_id, data) {
    return axios.patch(SERVER_URL + `api/photo/${photo_id}`, data)
}

export function deletePhoto(photo_id) {
    return axios.delete(SERVER_URL + `api/photo/${photo_id}`)
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

