import React, { ChangeEvent } from 'react';
import CategoryType from '../../types/CategoryType';
import { RecordOf } from 'immutable';
import ContentType from '../../types/ContentType';

type EditAlbumComponentProps = {
    caption: string;
    albumInfo: RecordOf<ContentType>
    setIsPrivate: (isPrv: boolean) => void;
    categories?: CategoryType[];
    handleCategory: (e: ChangeEvent<HTMLInputElement>) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    confirmAlbum: () => void;
    cancelAlbum: () => void;
}

function EditAlbumComponent ({
    caption, albumInfo, setIsPrivate,
    categories, handleCategory,
    handleChange, confirmAlbum, cancelAlbum }: EditAlbumComponentProps) {

    const makeIsPrivate = () => {
        if(albumInfo.album) {

            return (
                <div className="select-private-wrapper">
                    <div
                        className={`select-private-unit ${albumInfo.album.is_private ? 'selected' : ''}`}
                        onClick={() => setIsPrivate(true)}>
                        <i className="ri-user-fill enif-f-1p2x"></i>개인앨범
                    </div>
                    <div
                        className={`select-private-unit ${albumInfo.album.is_private ? '' : 'selected'}`}
                        onClick={() => setIsPrivate(false)}>
                        <i className="ri-group-fill enif-f-1p2x"></i>그룹앨범
                    </div>
                </div>
            )
        }
    }

    const makeCategoryList = () => {
        if (categories && categories.length > 0) {
            return categories.map((category) => {
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
                            checked={albumInfo.category_id === category.category_id} onChange={handleCategory} />
                        <label htmlFor={category.category_id}
                            style={albumInfo.category_id === category.category_id ? style_selected : style}>{category.category_name}</label>
                    </>
                )
            })
        }
    }

    return (
        <div className="enif-popup">
            <div className="enif-popup-content crt-alb-wrapper">
                <table className="enif-table">
                    <caption>{caption}</caption>
                    <tbody>
                        <tr>
                            <td colSpan={2}>{makeIsPrivate()}</td>
                        </tr>
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
                                <input type="text" name="title" placeholder="앨범 제목" value={albumInfo.title} onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>설명</th>
                            <td className="crt-alb-contents">
                                <textarea name="text" placeholder="앨범 설명" value={albumInfo.text} onChange={handleChange} />
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