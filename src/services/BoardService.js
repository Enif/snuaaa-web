import { AaaService } from './index'

const BoardService = {

    retrieveBoards: function() {
        return AaaService.get(`board`)
    },
    
    retrieveBoardInfo: function(board_id) {
        return AaaService.get(`board/${board_id}`);
    },
    
    retrievePostsInBoard: function(board_id, pageIdx) {
        return AaaService.get(`board/${board_id}/posts?page=${pageIdx}`);
    },
    
    searchPostsInBoard: function(board_id, searchType, keyword, pageIdx) {
        return AaaService.get(`board/${board_id}/posts/search?type=${searchType}&keyword=${keyword}&page=${pageIdx}`);
    },
    
    retrieveTagsInBoard: function(board_id) {
        return AaaService.get(`board/${board_id}/tags`);
    },

    retrieveExhibitionsInBoard: function(board_id) {
        return AaaService.get(`board/${board_id}/exhibitions`)
    },

    createExhibition: function (board_id, data) {
        return AaaService.post(`board/${board_id}/exhibition`, data)
    },

    createPost: function (board_id, data) {
        return AaaService.post(`board/${board_id}/post`, data)
    }
}

export default BoardService;
