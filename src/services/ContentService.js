import { AaaService } from './index.ts';

const ContentService = {

    likeContent: function(content_id) {
        return AaaService.post(`content/${content_id}/like`);
    },
    
    retrieveComments: function(parent_id) {
        return AaaService.get(`content/${parent_id}/comments`);
    },
    
    createComment: function(parent_id, data) {
        return AaaService.post(`content/${parent_id}/comment`, data);
    }
}

export default ContentService;
