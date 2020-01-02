import { AaaService } from './index';

const PostService = {

    retrievePost: function (post_id: number) {
        return AaaService.get(`post/${post_id}`);
    },

    updatePost: function (post_id: number, data: any) {
        return AaaService.patch(`post/${post_id}`, data)
    },

    deletePost: function (post_id: number) {
        return AaaService.delete(`post/${post_id}`)
    },

    createPost: function (board_id: number, data: any) {
        return AaaService.post(`board/${board_id}/post`, data)
    }
}

export default PostService;
