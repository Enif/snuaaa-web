import { AaaService } from './index';

const ContentService = {

    likeContent: function(content_id: number) {
        return AaaService.post(`content/${content_id}/like`);
    },
    
    retrieveComments: function(parent_id: number) {
        return AaaService.get(`content/${parent_id}/comments`);
    },
    
    createComment: function(parent_id: number, data: any) {
        return AaaService.post(`content/${parent_id}/comment`, data);
    }
}

export default ContentService;
