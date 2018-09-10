import React from 'react';
import Loading from '../Common/Loading';

const TAG = 'ALBUMLIST'

class AlbumList extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);

        this.state = {
            boardNo: this.props.boardNo,
            isShow: false
        }
    }


    render() {
        console.log('[%s] render', TAG)
        
        return (
            <React.Fragment>
            
                {/* // isShow ?
                // (
                //     <div>
                //         <div className="post-list">
                //         {this.posts}
                //     </div>
                //         <button onClick={() => this.props.setBoardState(1)}>글쓰기</button>
                //     </div>       
                // )
                // :
//                albumlist */}
                
                {/* <Loading/> */}
                <button className="enif-btn-circle" onClick={() => this.props.togglePopUp()}>+</button>
                

            
            </React.Fragment>
        ) 
    }

    componentDidMount() {
        console.log('[%s] componentDidMount', TAG)
    }
}

export default AlbumList;