import React from 'react';
import EditAlbumComponent from '../../components/Album/EditAlbumComponent';
import PhotoBoardService from 'services/PhotoBoardService';

const TAG = 'CREATEALBUM'

class CreateAlbum extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);

        this.state = {
            title: '',
            text: '',
            checkedCategory: null,
            isPrivate: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleCategoryChange = (e) => {
        this.setState({
            checkedCategory: e.target.value
        })
    }

    setIsPrivate = (isPrivate) => {
        this.setState({
            isPrivate: isPrivate
        })
    }

    createAlbum = async () => {
        console.log('[%s] createAlbum', TAG);
        const { title, text, checkedCategory, isPrivate } = this.state;

        if (!title) {
            alert("제목을 입력해 주세요")
        }
        else if (this.props.categories && !checkedCategory) {
            alert("카테고리를 선택해 주세요")
        }
        else {
            let albumInfo = {
                category_id: checkedCategory,
                title: title,
                text: text,
                is_private: isPrivate
            }

            await PhotoBoardService.createAlbum(this.props.board_id, albumInfo)
                .then(() => {
                    console.log('[%s] Create Album Success', TAG);
                    this.props.togglePopUp();
                    this.props.fetch()
                })
                .catch((err) => {
                    console.error(err)
                    alert("앨범 생성 실패");
                })
        }
    }

    render() {
        console.log('[%s] render', TAG)

        const { setIsPrivate, handleCategoryChange, handleChange, createAlbum } = this;
        const { title, text, checkedCategory, isPrivate } = this.state;
        const { categories, togglePopUp } = this.props;
        return (
            <EditAlbumComponent
                caption="앨범 생성"
                title={title}
                text={text}
                isPrivate={isPrivate}
                setIsPrivate={setIsPrivate}
                checkedCategory={checkedCategory}
                categories={categories}
                handleCategory={handleCategoryChange}
                handleChange={handleChange}
                confirmAlbum={createAlbum}
                cancelAlbum={togglePopUp}
            />
        )
    }
}

export default CreateAlbum;
