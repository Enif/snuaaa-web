import { AaaService } from './index'

const HomeService = {

    retrieveSoundBox: function () {
        return AaaService.get(`home/soundbox`);
    },

    retrieveRecentPosts: function () {
        return AaaService.get(`home/posts`);
    },

    retrieveAllPosts: function (pageIdx) {
        return AaaService.get(`home/posts/all?page=${pageIdx}`);
    },

    retrieveRecentComments: function () {
        return AaaService.get(`home/comments`);
    },

    retrieveAllComments: function () {
        return AaaService.get(`home/comments/all`);
    },

    retrieveRecentMemory: function () {
        return AaaService.get(`home/memory`);
    },

    retrieveRecentAstroPhoto: function () {
        return AaaService.get(`home/astrophoto`);
    },

    retrieveRiseSet: function () {
        return AaaService.get(`home/riseset`);
    }
}

export default HomeService;
