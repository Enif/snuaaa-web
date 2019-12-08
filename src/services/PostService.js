import { AaaService } from './index.ts';

const PostService = {

    retrievePost: function (post_id) {
        return AaaService.get(`post/${post_id}`);
    },

    updatePost: function (post_id, data) {
        return AaaService.patch(`post/${post_id}`, data)
    },

    deletePost: function (post_id) {
        return AaaService.delete(`post/${post_id}`)
    },

    createPost: function (board_id, data) {
        return AaaService.post(`board/${board_id}/post`, data)
    }
}

export default PostService;
