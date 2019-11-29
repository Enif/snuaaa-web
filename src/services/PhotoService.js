import { AaaService } from './index'

const PhotoService = {

    retrievePhoto: function (photo_id) {
        return AaaService.get(`photo/${photo_id}`)
    },

    updatePhoto: function (photo_id, data) {
        return AaaService.patch(`photo/${photo_id}`, data)
    },

    deletePhoto: function (photo_id) {
        return AaaService.delete(`photo/${photo_id}`)
    }
}

export default PhotoService;
