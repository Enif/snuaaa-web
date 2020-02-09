import UserType from './UserType';
import AlbumType from './AlbumType';
import PhotoType from './PhotoType';
import BoardType from './BoardType';
import TagType from './TagType';
import ExhibitionType from './ExhibitionType';
import CategoryType from './CategoryType';
import FileType from './FileType';
import ExhibitPhotoType from './ExhibitPhotoType';

interface ContentType {
    content_id: number;
    content_uuid?: string;
    author_id?: number;
    board_id: string;
    category_id?: string;
    type?: string;
    title: string;
    text: string;
    view_num: number;
    comment_num: number;
    like_num: number;
    createdAt: string;
    updatedAt: string;
    board: BoardType;
    user: UserType;
    // album?: AlbumType;
    albumPhoto?: PhotoType[];
    photo?: PhotoType;
    exhibition?: ExhibitionType;
    // exhibitPhoto?: ExhibitPhotoType;
    tags?: TagType[];
    category?: CategoryType;
    attachedFiles?: FileType[];
}

export default ContentType;
