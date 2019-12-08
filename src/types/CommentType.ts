import UserType from './UserType';
import AlbumType from './AlbumType';
import PhotoType from './PhotoType';
import BoardType from './BoardType';

interface ConmmentType {
    comment_id: number;
    comment_uuid: string;
    parent_id: number;
    author_id: number;
    text: string;
    like_num: number;
}

export default ConmmentType;
