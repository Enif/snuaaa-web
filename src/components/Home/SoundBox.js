import React from 'react'
import { Link } from 'react-router-dom';
import { retrieveSoundBox } from '../../services'

const TAG = 'SOUNDBOX';

class SoundBox extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            title: '',
            contents: ''
        }

        this.retrieveSoundBox();
    }

    retrieveSoundBox = async () => {
        console.log('[%s] Retrieve Soundbox', TAG);
        await retrieveSoundBox()
        .then((res) => {
            console.log(res.data)
            this.setState({
                title: res.data.title,
                contents: res.data.contents
            })
        })
        .catch((res) => {
            console.log('[%s] Retrieve Soundbox Fail', TAG);
        })
    }

    render() {
        return(
            <div id="soundbox-wrapper" className="content">
                <Link to ='/board/brd01'><div id="soundbox-title">NOTICE</div></Link>
                <div id="soundbox-contents-wrapper">
                    <div id="soundbox-content" className="content">    
                        <h5>{this.state.title}</h5>
                        <p>{this.state.contents.split('\n').map(line => {
                            return (<span>{line} <br/></span>)
                        })}</p>
                    </div>
                </div>
                <div id="soundbox-img"></div>
            </div>
        )
    }
}

export default SoundBox;