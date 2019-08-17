import React from 'react';
import * as service from 'services';
import EditAlbumComponent from 'components/Album/EditAlbumComponent';
import ContentStateEnum from 'common/ContentStateEnum';

const TAG = 'EDITALBUM'

class EditAlbum extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] constructor`)
        super(props);

        this.state = {
            title: props.albumInfo.content.title,
            text: props.albumInfo.content.text,
            checkedCategory: props.albumInfo.content.category_id
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // makeCategoryList = () => {
    //     let CategoryList = this.props.categories.map((category) => {
    //         let style = {
    //             "border": `1px solid ${category.category_color}`,
    //         }            
    //         let style_selected = {
    //             "border": `1px solid ${category.category_color}`,
    //             "backgroundColor": category.category_color,
    //             "color": "#eeeeee"
    //         }
    //         return (
    //             <>
    //                 <input type="radio" id={category.category_id} name="category" value={category.category_id}
    //                 checked={this.state.checkedCategory === category.category_id} onChange={this.handleCategoryChange}/>
    //                 <label htmlFor={category.category_id}
    //                     style={this.state.checkedCategory === category.category_id ? style_selected : style}>{category.category_name}</label>
    //             </>
    //         )
    //     })
    //     return CategoryList;
    // }

    updateAlbum = async () => {

        if(!this.state.title) {
            alert("제목을 입력해 주세요")
        }
        else if(this.props.categories && !this.state.checkedCategory) {
            alert("카테고리를 선택해 주세요")
        }
        else {
            let albumInfo = {
                category_id: this.state.checkedCategory,
                title: this.state.title,
                text: this.state.text
            }
            
            await service.updateAlbum(this.props.album_id, albumInfo)
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
        const { title, text, checkedCategory } = this.state;
     
        return (
            <EditAlbumComponent
                caption="앨범 수정"
                title={title}
                text={text}
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