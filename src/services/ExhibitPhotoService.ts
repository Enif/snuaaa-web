import { AaaService } from './index';

const ExhibitPhotoService = {

    retrieveExhibitPhoto: function (exhibitPhoto_id: number) {
        return AaaService.get(`exhibitPhoto/${exhibitPhoto_id}`);
    },

    updateExhibitPhoto: function (exhibitPhoto_id: number, data: any) {
        return AaaService.patch(`exhibitPhoto/${exhibitPhoto_id}`, data)
    },

    deleteExhibitPhoto: function (exhibitPhoto_id: number) {
        return AaaService.delete(`exhibitPhoto/${exhibitPhoto_id}`)
    }
}

export default ExhibitPhotoService;
