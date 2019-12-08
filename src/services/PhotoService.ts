import { AaaService } from './index';
import { AxiosPromise } from 'axios';
import ContentType from '../types/ContentType';
import TagType from '../types/TagType';

const PhotoService = {

    retrievePhoto: function (photo_id: number): AxiosPromise<{
        photoInfo: ContentType,
        likeInfo: boolean,
        boardTagInfo: TagType[],
        albumPhotosInfo: ContentType[]
    }> {
        return AaaService.get(`photo/${photo_id}`)
    },

    updatePhoto: function (photo_id: number, data: any) {
        return AaaService.patch(`photo/${photo_id}`, data)
    },

    deletePhoto: function (photo_id: number) {
        return AaaService.delete(`photo/${photo_id}`)
    }
}

export default PhotoService;
