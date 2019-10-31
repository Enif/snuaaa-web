import { AaaService } from './index'

const BoardService = {

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
