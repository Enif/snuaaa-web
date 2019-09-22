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

    updatePassword: function(data) {
        return AaaService.patch(`userinfo/password`, data)
    },

    findId: function(data) {
        return AaaService.post(`userinfo/find/id`, data)
    },

    findPw: function(data) {
        return AaaService.post(`userinfo/find/pw`, data)
    }
}

export default UserService;