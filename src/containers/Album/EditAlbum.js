import React from 'react';

import EditAlbumComponent from 'components/Album/EditAlbumComponent';
import ContentStateEnum from 'common/ContentStateEnum';
import AlbumService from 'services/AlbumService.ts';

const TAG = 'EDITALBUM'

class EditAlbum extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] constructor`)
        super(props);

        this.state = {
            title: props.albumInfo.content.title,
            text: props.albumInfo.content.text,
            checkedCategory: props.albumInfo.content.category_id,
            isPrivate: props.albumInfo.is_private
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    setIsPrivate = (isPrivate) => {
        this.setState({
            isPrivate: isPrivate
        })
    }

    updateAlbum = async () => {

        const { title, text, checkedCategory, isPrivate } = this.state;

        if(!title) {
            alert("제목을 입력해 주세요")
        }
        else if(this.props.categories && !checkedCategory) {
            alert("카테고리를 선택해 주세요")
        }
        else {
            let albumInfo = {
                category_id: checkedCategory,
                title: title,
                text: text,
                is_private: isPrivate
            }
            
            await AlbumService.updateAlbum(this.props.album_id, albumInfo)
            .then(() => {
                console.log('[%s] Update Album Success', TAG);
                this.props.setAlbumState(ContentStateEnum.READY);
                this.props.fetch()
            })
            .catch((err) => {
                console.error(err)
                alert("업데이트 실패");
            })
        }
    }

    handleCategoryChange = (e) => {
        this.setState({
            checkedCategory: e.target.value
        })
    }

    render() {
        console.log('[%s] render', TAG);
        const { title, text, checkedCategory, isPrivate } = this.state;
     
        return (
            <EditAlbumComponent
                caption="앨범 수정"
                title={title}
                text={text}
                isPrivate={isPrivate}
                setIsPrivate={this.setIsPrivate}
                checkedCategory={checkedCategory}
                categories={this.props.categoryInfo}
                handleCategory={this.handleCategoryChange}
                handleChange={this.handleChange}
                confirmAlbum={() => this.updateAlbum()}
                cancelAlbum={() => this.props.setAlbumState(ContentStateEnum.READY)}
            />
        ) 
    }

}

export default EditAlbum;