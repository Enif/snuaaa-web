import { AaaService } from './index.ts';

const PhotoBoardService = {

    retrieveAlbumsInPhotoBoard: function (board_id, pageIdx, ctg_id) {
        if (!ctg_id) {
            return AaaService.get(`photoboard/${board_id}/albums?page=${pageIdx ? pageIdx : 1}`);
        }
        else {
            return AaaService.get(`photoboard/${board_id}/albums?category=${ctg_id}&page=${pageIdx ? pageIdx : 1}`);
        }
    },

    createAlbum: function (board_id, data) {
        return AaaService.post(`photoboard/${board_id}/album`, data);
    },

    retrievePhotosInPhotoBoard: function (board_id, pageIdx) {
        return AaaService.get(`photoboard/${board_id}/photos?page=${pageIdx}`);
    },

    createPhotosInPhotoBoard: function (board_id, data) {
        return AaaService.post(`photoboard/${board_id}/photos`, data);
    },

    retrievePhotosInPhotoBoardByTag: function (board_id, tags, pageIdx) {
        let tagUrl = '';

        tags.forEach((tag) => {
            if (!tagUrl) {
                tagUrl += `tags[]=${tag}`
            }
            else {
                tagUrl += `&tags[]=${tag}`
            }
        })
        return AaaService.get(`photoboard/${board_id}/photos?${tagUrl}&page=${pageIdx}`)
    }
}

export default PhotoBoardService;
