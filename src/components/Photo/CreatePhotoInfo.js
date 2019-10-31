import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

const CreatePhotoInfo = ({ title, text, date, location, camera, lens, focal_length, f_stop,
    exposure_time, iso, handleChange, handleDate }) => {
    return (
        <div className="photo-infos-wrapper">
            <input className="input-title" type="text" name="title" placeholder="제목" onChange={handleChange} value={title} />
            <textarea className="input-desc" placeholder="설명" name="text" onChange={handleChange} value={text} />
            <div className="photo-infos">
                <div className="photo-info">
                    <div className="label-wrapper"><label>Date</label></div>
                    <DatePicker selected={date} onChange={handleDate} dateFormat="yyyy/MM/dd" />
                    {/* <input className="enif-wid-half" type="date" name="date" onChange={(e) => handleChange(e)} value={date}></input> */}
                </div>
                <div className="photo-info">
                    <div className="label-wrapper"><label>Location</label></div>
                    <input className="enif-wid-half" type="text" name="location" onChange={(e) => handleChange(e)} value={location}></input>
                </div>
                <div className="photo-info">
                    <div className="label-wrapper"><label>Camera</label></div>
                    <input className="enif-wid-half" type="text" name="camera" onChange={(e) => handleChange(e)} value={camera}></input>
                </div>
                <div className="photo-info">
                    <div className="label-wrapper"><label>Lens</label></div>
                    <input className="enif-wid-half" type="text" name="lens" onChange={(e) => handleChange(e)} value={lens}></input>
                </div>
                <div className="photo-info">
                    <div className="label-wrapper"><label>@</label></div>
                    <input className="enif-wid-half" type="text" name="focal_length" onChange={(e) => handleChange(e)} value={focal_length}></input>
                </div>
                <div className="photo-info">
                    <div className="label-wrapper">Setting</div>
                    <div className="input-wrapper">
                        <div>
                            <label>F/</label>
                            <input className="enif-wid-quater" type="text" name="f_stop" onChange={(e) => handleChange(e)} value={f_stop}></input>
                        </div>
                        <div>
                            <input className="enif-wid-quater" type="text" name="exposure_time" onChange={(e) => handleChange(e)} value={exposure_time}></input>
                            <label>s</label>
                        </div>
                        <div>
                            <label>ISO</label>
                            <input className="enif-wid-quater" type="text" name="iso" onChange={(e) => handleChange(e)} value={iso}></input>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CreatePhotoInfo;