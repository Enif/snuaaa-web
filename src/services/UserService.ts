import { AaaService } from './index'
import UserType from '../types/UserType';
import { AxiosPromise } from 'axios';

const UserService = {

    retrieveUserInfo: function(user_uuid: string): AxiosPromise<UserType> {
        if(user_uuid) {
            return AaaService.get(`userinfo/${user_uuid}`)
        }
        else {
            return AaaService.get(`userinfo`);
        }
    },

    updateUserInfo: function(data: any) {
        return AaaService.patch('userinfo', data);
    },
    
    deleteUserInfo: function() {
        return AaaService.delete('userinfo');
    },

    retrieveUserPosts: function(user_uuid: string) {
        if(user_uuid) {
            return AaaService.get(`userinfo/${user_uuid}/posts`);
        }
        else {
            return AaaService.get('userinfo/posts');
        }
    },
    
    retrieveUserPhotos: function(user_uuid: string) {
        if(user_uuid) {
            return AaaService.get(`userinfo/${user_uuid}/photos`);
        }
        else {
            return AaaService.get('userinfo/photos');
        }
    },
    
    retrieveUserComments: function(user_uuid: string) {
        if(user_uuid) {
            return AaaService.get(`userinfo/${user_uuid}/comments`);
        }
        else {
            return AaaService.get(`userinfo/comments`);        
        }
    },
    
    updatePassword: function(data: any) {
        return AaaService.patch(`userinfo/password`, data)
    },

    findId: function(data: any) {
        return AaaService.post(`userinfo/find/id`, data)
    },

    findPw: function(data: any) {
        return AaaService.post(`userinfo/find/pw`, data)
    },

    searchMini: function(name: string) {
        if(name) {
            return AaaService.get(`userinfo/search/mini?name=${name}`)
        }
    }
}


// class UserService extends AaaService<UserType> {

//     retrieveUserInfo(user_uuid: string): AxiosPromise<UserType> {
//         if (user_uuid) {
//             return this.get(`userinfo/${user_uuid}`)
//         }
//         else {
//             return this.get(`userinfo`);
//         }
//     }

//     updateUserInfo(data: UserType) {
//         return this.patch('userinfo', data);
//     }

//     deleteUserInfo() {
//         return this.delete('userinfo');
//     }

//     retrieveUserPosts(user_uuid: string) {
//         if (user_uuid) {
//             return this.get(`userinfo/${user_uuid}/posts`);
//         }
//         else {
//             return this.get('userinfo/posts');
//         }
//     }

//     retrieveUserPhotos(user_uuid: string) {
//         if (user_uuid) {
//             return this.get(`userinfo/${user_uuid}/photos`);
//         }
//         else {
//             return this.get('userinfo/photos');
//         }
//     }

//     retrieveUserComments(user_uuid: string) {
//         if (user_uuid) {
//             return this.get(`userinfo/${user_uuid}/comments`);
//         }
//         else {
//             return this.get(`userinfo/comments`);
//         }
//     }

//     updatePassword(data: any) {
//         return this.patch(`userinfo/password`, data)
//     }

//     findId(data: any) {
//         return this.post(`userinfo/find/id`, data)
//     }

//     findPw(data: any) {
//         return this.post(`userinfo/find/pw`, data)
//     }

//     searchMini(name: string) {
//         if (name) {
//             return this.get(`userinfo/search/mini?name=${name}`)
//         }
//     }
// }

export default UserService;
