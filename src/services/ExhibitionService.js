import { AaaService } from './index.ts';

const ExhibitionService = {

    retrieveExhibition: function (exhibition_id) {
        return AaaService.get(`exhibition/${exhibition_id}`);
    },

    updateExhibition: function (exhibition_id, data) {
        return AaaService.patch(`exhibition/${exhibition_id}`, data)
    },

    deleteExhibition: function (exhibition_id) {
        return AaaService.delete(`exhibition/${exhibition_id}`)
    },

    createExhibitPhoto: function (exhibition_id, data) {
        return AaaService.post(`exhibition/${exhibition_id}/exhibitPhoto`, data)
    },

    retrieveExhibitPhotosinExhibition: function (exhibition_id) {
        return AaaService.get(`exhibition/${exhibition_id}/exhibitPhotos`)
    }
}

export default ExhibitionService;
