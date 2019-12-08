import { AaaService } from './index.ts';

const AlbumService = {

    createPhotosInAlbum: function (album_id, data) {
        return AaaService.post(`album/${album_id}/photos`, data)
    },

    retrieveAlbum: function (album_id) {
        return AaaService.get(`album/${album_id}`)
    },

    updateAlbum: function (album_id, data) {
        return AaaService.patch(`album/${album_id}`, data)
    },

    updateAlbumThumbnail: function (album_id, data) {
        return AaaService.patch(`album/${album_id}/thumbnail`, data)
    },

    deleteAlbum: function (album_id) {
        return AaaService.delete(`album/${album_id}`)
    },

    retrievePhotosInAlbum: function (album_id) {
        return AaaService.get(`album/${album_id}/photos`)
    }
}

export default AlbumService;
