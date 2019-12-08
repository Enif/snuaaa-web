import { AaaService } from './index.ts';

const DocuService = {

    retrieveDocument: function (doc_id) {
        return AaaService.get(`document/${doc_id}`)
    },

    retrieveDocuments: function (pageIdx, ctg_id, generation) {
        let categoryUrl = '';
        let genUrl = '';
        ctg_id && (categoryUrl = `&category=${ctg_id}`);
        generation && (genUrl = `&generation=${generation}`);
        return AaaService.get(`document?page=${pageIdx}${categoryUrl}${genUrl}`)
    },

    retrieveDocumentsByGeneration: function (generation) {
        return AaaService.get(`document/generation/${generation}`)
    },

    updateDocument: function (doc_id, data) {
        return AaaService.patch(`document/${doc_id}`, data)
    },

    deleteDocument: function (doc_id) {
        return AaaService.delete(`document/${doc_id}`)
    },

    createDocument: function (board_id, data) {
        return AaaService.post(`board/${board_id}/document`, data)
    }
}

export default DocuService;
