import { AaaService } from './index'

const UserService = {

    retrieveUserInfo: function(user_uuid) {
        if(user_uuid) {
            return AaaService.get(`userinfo/${user_uuid}`)
        }
        else {
            return AaaService.get(`userinfo`);
        }
    },

    updateUserInfo: function(data) {
        return AaaService.patch('userinfo', data);
    },
    
    deleteUserInfo: function() {
        return AaaService.delete('userinfo');
    },

    retrieveUserPosts: function(user_uuid) {
        if(user_uuid) {
            return AaaService.get(`userinfo/${user_uuid}/posts`);
        }
        else {
            return AaaService.get('userinfo/posts');
        }
    },
    
    retrieveUserPhotos: function(user_uuid) {
        if(user_uuid) {
            return AaaService.get(`userinfo/${user_uuid}/photos`);
        }
        else {
            return AaaService.get('userinfo/photos');
        }
    },
    
    retrieveUserComments: function(user_uuid) {
        if(user_uuid) {
            return AaaService.get(`userinfo/${user_uuid}/comments`);
        }
        else {
            return AaaService.get(`userinfo/comments`);        
        }
    },
    
    updatePassword: function(data) {
        return AaaService.patch(`userinfo/password`, data)
    },

    findId: function(data) {
        return AaaService.post(`userinfo/find/id`, data)
    },

    findPw: function(data) {
        return AaaService.post(`userinfo/find/pw`, data)
    },

    searchMini: function(name) {
        if(name) {
            return AaaService.get(`userinfo/search/mini?name=${name}`)
        }
    }
}

export default UserService;