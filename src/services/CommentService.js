import { AaaService } from './index.ts';

const CommentService = {
    
    retrieveComments: function(parent_id) {
        return AaaService.get(`content/${parent_id}/comments`);
    },
    
    createComment: function(parent_id, data) {
        return AaaService.post(`content/${parent_id}/comment`, data);
    },

    updateComment: function(comment_id, data) {
        return AaaService.patch(`comment/${comment_id}`, data);
    },
    
    deleteComment(comment_id) {
        return AaaService.delete(`comment/${comment_id}`);
    }
}

export default CommentService;
