import axios from 'axios';
import Cookies from 'universal-cookie';
import { SERVER_URL } from '../common/environment'

const cookies = new Cookies();

axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.get('token');
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + (sessionStorage.getItem('token') || localStorage.getItem('token'));

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

export function retrieveBoards() {
    return axios.get(SERVER_URL + `api/board`)
}

export function retrieveBoardInfo(board_id) {
    return axios.get(SERVER_URL + `api/board/${board_id}`);
}

export function retrievePostsInBoard(board_id, pageIdx) {
    return axios.get(SERVER_URL + `api/board/${board_id}/posts?page=${pageIdx}`);
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
    return axios.get(SERVER_URL + `api/content/${parent_id}/comments`);
}

export function createComment(parent_id, data) {
    return axios.post(SERVER_URL + `api/content/${parent_id}/comment`, data);
}
//GM modified 
export function updateComment(comment_id, data) {
    return axios.patch(SERVER_URL + `api/comment/${comment_id}`, data);
}

export function deleteComment(comment_id) {
    return axios.delete(SERVER_URL + `api/comment/${comment_id}`);
}

export function likeObject(content_id) {
    return axios.post(SERVER_URL + `api/content/${content_id}/like`);
}

export function retrieveAlbumsInPhotoBoard(board_id, pageIdx) {
    return axios.get(SERVER_URL + `api/photoboard/${board_id}/albums?page=${pageIdx}`)
}

export function retrieveAlbumsInPhotoBoardByCategory(board_id, ctg_id, pageIdx) {
    return axios.get(SERVER_URL + `api/photoboard/${board_id}/albums?category=${ctg_id}&page=${pageIdx}`)
}

export function createAlbum(board_id, data) {
    return axios.post(SERVER_URL + `api/photoboard/${board_id}/album`, data)
}

export function retrievePhotosInPhotoBoard(board_id, pageIdx) {
    return axios.get(SERVER_URL + `api/photoboard/${board_id}/photos?page=${pageIdx}`)
}

export function createPhotosInPhotoBoard(board_id, data) {
    return axios.post(SERVER_URL + `api/photoboard/${board_id}/photos`, data)
}

export function retrievePhotosInPhotoBoardByTag(board_id, tags, pageIdx) {
    let tagUrl = '';

    tags.forEach((tag) => {
        if (!tagUrl) {
            tagUrl += `tag=${tag}`
        }
        else {
            tagUrl += `&tag=${tag}`
        }
    })
    return axios.get(SERVER_URL + `api/photoboard/${board_id}/photos?${tagUrl}&page=${pageIdx}`)
}

export function createPhotosInAlbum(album_id, data) {
    return axios.post(SERVER_URL + `api/album/${album_id}/photos`, data)
}

export function retrieveAlbum(album_id) {
    return axios.get(SERVER_URL + `api/album/${album_id}`)
}

export function updateAlbum(album_id, data) {
    return axios.patch(SERVER_URL + `api/album/${album_id}`, data)
}

export function deleteAlbum(album_id) {
    return axios.delete(SERVER_URL + `api/album/${album_id}`)
}

export function retrievePhotosInAlbum(album_id) {
    return axios.get(SERVER_URL + `api/album/${album_id}/photos`)
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

export function retrieveDocument(doc_id) {
    return axios.get(SERVER_URL + `api/document/${doc_id}`)
}

export function retrieveDocuments(pageIdx, ctg_id, generation) {
    let categoryUrl = '';
    let genUrl = '';
    ctg_id && (categoryUrl = `&category=${ctg_id}`);
    generation && (genUrl = `&generation=${generation}`);
    return axios.get(SERVER_URL + `api/document?page=${pageIdx}${categoryUrl}${genUrl}`)
}

export function retrieveDocumentsByGeneration(generation) {
    return axios.get(SERVER_URL + `api/document/generation/${generation}`)
}

export function createDocument(board_id, data) {
    return axios.post(SERVER_URL + `api/board/${board_id}/document`, data)
}

export function downloadDocument(doc_id, index) {
    return axios.get(SERVER_URL + `api/document/${doc_id}/download/${index}`)
}

export function deleteDocument(doc_id) {
    return axios.delete(SERVER_URL + `api/document/${doc_id}`)
}

export function retrieveSoundBox() {
    return axios.get(SERVER_URL + `api/home/soundbox`);
}

export function retrieveRecentPosts() {
    return axios.get(SERVER_URL + `api/home/posts`);
}

export function retrieveRecentComments() {
    return axios.get(SERVER_URL + `api/home/comments`);
}

export function retrieveRecentMemory() {
    return axios.get(SERVER_URL + `api/home/memory`);
}

export function retrieveRecentAstroPhoto() {
    return axios.get(SERVER_URL + `api/home/astrophoto`);
}
