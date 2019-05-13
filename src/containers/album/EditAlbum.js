import React from 'react';
import * as service from '../../services';
import ContentStateEnum from '../../common/ContentStateEnum';

const TAG = 'EDITALBUM'

class EditAlbum extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] constructor`)
        super(props);

        console.log(props)
        this.state = {
            title: props.albumInfo.title,
            contents: props.albumInfo.contents,
            // checkedCategory: ''
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
                // category_id: this.state.checkedCategory,
                title: this.state.title,
                contents: this.state.contents
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
        const { title, contents } = this.state;
     
        return (
            <div className="enif-popup">
                <div className="enif-popup-content crt-alb-wrapper">
                    <table className="enif-table">
                        <caption>앨범 수정</caption>
                        <tbody>
                            {
                                this.props.categories &&
                                <tr>
                                    <th>카테고리</th>
                                    <td className="categories-wrapper">{this.makeCategoryList()}</td>
                                </tr>
                            }
                            <tr>
                                <th>제목</th>
                                <td className="input-text crt-alb-title">
                                    <input type="text" name="title" placeholder="앨범 제목" value={title} onChange={this.handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <th>설명</th>
                                <td className="crt-alb-contents">
                                    <textarea name="contents" placeholder="앨범 설명" value={contents} onChange={this.handleChange}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="enif-btn-common enif-btn-ok" onClick={() => this.updateAlbum()}>OK</button>
                    <button className="enif-btn-common enif-btn-cancel" onClick={() => this.props.setAlbumState(ContentStateEnum.READY)} >CANCEL</button>
                </div>

            </div>
        ) 
    }

}

export default EditAlbum;