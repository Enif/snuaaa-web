import axios from 'axios';
import { getToken } from 'utils/tokenManager';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();

export const AaaService = {
    
    get: function(url) {
        return axios.get(`${SERVER_URL}api/${url}`)
    },
    
    post: function(url, data) {
        return axios.post(`${SERVER_URL}api/${url}`, data)
    },

    patch: function(url, data) {
        return axios.patch(`${SERVER_URL}api/${url}`, data)
    },
    
    delete: function(url) {
        return axios.delete(`${SERVER_URL}api/${url}`)
    }
}


export function createAttachedImage(data) {
    return axios.post(SERVER_URL + `api/image`, data);
}
