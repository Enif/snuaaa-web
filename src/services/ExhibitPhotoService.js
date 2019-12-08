import { AaaService } from './index.ts';

const ExhibitPhotoService = {

    retrieveExhibitPhoto: function (exhibitPhoto_id) {
        return AaaService.get(`exhibitPhoto/${exhibitPhoto_id}`);
    },

    updateExhibitPhoto: function (exhibitPhoto_id, data) {
        return AaaService.patch(`exhibitPhoto/${exhibitPhoto_id}`, data)
    },

    deleteExhibitPhoto: function (exhibitPhoto_id) {
        return AaaService.delete(`exhibitPhoto/${exhibitPhoto_id}`)
    }
}

export default ExhibitPhotoService;
