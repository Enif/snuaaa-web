import UserType from './UserType';
import AlbumType from './AlbumType';
import PhotoType from './PhotoType';
import BoardType from './BoardType';

interface ContentType {
    content_id: number;
    content_uuid: string;
    author_id: number;
    board_id: string;
    category_id?: string;
    type?: string;
    title: string;
    text: string;
    view_num: number;
    comment_num?: number;
    like_num: number;
    createdAt?: string;
    updatedAt?: string;
    user?: UserType;
    album?: AlbumType;
    photo?: PhotoType;
    board?: BoardType;
}

export default ContentType;
