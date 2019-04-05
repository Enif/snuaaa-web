import React from 'react';

const CreatePhotoInfo = (props) => {
    return (
        <div className="photo-infos-wrapper">
            <input className="input-title" type="text" name="title" placeholder="제목" onChange={(e) => props.handleChange(e)} value={props.title} />
            <textarea className="input-desc" placeholder="설명" name="desc" onChange={(e) => props.handleChange(e)} value={props.desc}/>
            <div className="photo-infos">
                <div className="photo-info">
                    <div className="label-wrapper"><label>Date</label></div>
                    <input className="enif-wid-half" type="date" name="date" onChange={(e) => props.handleChange(e)} value={props.date}></input>                    
                </div>
                <div className="photo-info">
                    <div className="label-wrapper"><label>Location</label></div>
                    <input className="enif-wid-half" type="text" name="location" onChange={(e) => props.handleChange(e)} value={props.location}></input>
                </div>
                <div className="photo-info">
                    <div className="label-wrapper"><label>Camera</label></div>
                    <input className="enif-wid-half" type="text" name="camera" onChange={(e) => props.handleChange(e)} value={props.camera}></input>
                </div>
                <div className="photo-info">
                    <div className="label-wrapper"><label>Lens</label></div>
                    <input className="enif-wid-half" type="text" name="lens" onChange={(e) => props.handleChange(e)} value={props.lens}></input>
                </div>
                <div className="photo-info">
                    <div className="label-wrapper"><label>@</label></div>
                    <input className="enif-wid-half" type="number" name="focal_length" onChange={(e) => props.handleChange(e)} value={props.focal_length}></input>
                </div>
                <div className="photo-info">
                    <div className="label-wrapper">Setting</div>
                    <div className="input-wrapper">
                        <div>
                            <label>F/</label>
                            <input className="enif-wid-quater" type="number" name="f_stop" onChange={(e) => props.handleChange(e)} value={props.f_stop}></input>
                        </div>
                        <div>
                            <input className="enif-wid-quater" type="text" name="exposure_time" onChange={(e) => props.handleChange(e)} value={props.exposure_time}></input>
                            <label>s</label>
                        </div>
                        <div>
                            <label>ISO</label>
                            <input className="enif-wid-quater" type="number" name="iso" onChange={(e) => props.handleChange(e)} value={props.iso}></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePhotoInfo;