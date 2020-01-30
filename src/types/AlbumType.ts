import ContentType from "./ContentType";

interface AlbumType extends ContentType {
    album: {
        is_private: boolean,
        thumbnail: ContentType
    }
}

export default AlbumType;
