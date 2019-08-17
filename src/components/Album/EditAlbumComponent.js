import React from 'react';

const EditAlbumComponent = ({ caption, title, text, checkedCategory, categories, handleCategory, handleChange, confirmAlbum, cancelAlbum }) => {

    const makeCategoryList = () => {
        let CategoryList = categories.map((category) => {
            let style = {
                "border": `1px solid ${category.category_color}`,
            }            
            let style_selected = {
                "border": `1px solid ${category.category_color}`,
                "backgroundColor": category.category_color,
                "color": "#eeeeee"
            }
            return (
                <>
                    <input type="radio" id={category.category_id} name="category" value={category.category_id}
                    checked={checkedCategory === category.category_id} onChange={handleCategory}/>
                    <label htmlFor={category.category_id}
                        style={checkedCategory === category.category_id ? style_selected : style}>{category.category_name}</label>
                </>
            )
        })
        return CategoryList;
    }

    return (
        <div className="enif-popup">
            <div className="enif-popup-content crt-alb-wrapper">
                <table className="enif-table">
                    <caption>{caption}</caption>
                    <tbody>
                        {
                            (categories && categories.length > 0) &&
                            <tr>
                                <th>카테고리</th>
                                <td className="categories-wrapper">{makeCategoryList()}</td>
                            </tr>
                        }
                        <tr>
                            <th>제목</th>
                            <td className="input-text crt-alb-title">
                                <input type="text" name="title" placeholder="앨범 제목" value={title} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>설명</th>
                            <td className="crt-alb-contents">
                                <textarea name="text" placeholder="앨범 설명" value={text} onChange={handleChange}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="enif-btn-common enif-btn-ok" onClick={confirmAlbum}>OK</button>
                <button className="enif-btn-common enif-btn-cancel" onClick={cancelAlbum} >CANCEL</button>
            </div>
        </div>
    ) 
}

export default EditAlbumComponent;