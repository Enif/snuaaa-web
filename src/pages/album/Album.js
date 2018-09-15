import React from 'react';
import PhotoList from '../../components/Album/PhotoList';
import CreatePhoto from '../../components/Album/CreatePhoto';

const TAG = 'ALBUM'

class Album extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            albumNo: this.props.match.params.aNo,
            albumState: 0,
            popUpState: false,
        }
        console.log(this.props.match);
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log('[%s] getDerivedStateFromProps', TAG);
    //     return {
    //         boardNo: props.match.params.pbNo
    //     }
    // }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    render() {
        return (
            <React.Fragment>
                <div id="contents-center">
                    <div className="board-wrapper">
                        {/* <h2>{this.getBoardName(this.state.boardNo)}</h2> */}
                        {
                            (() => {
                                if (this.state.albumState === 0) return (<PhotoList albumNo={this.state.albumNo} togglePopUp={this.togglePopUp}/>);
                                else return (<div>error page</div>);
                            })()
                        }
                    </div>
                </div>
                {
                    this.state.popUpState && <CreatePhoto boardNo={this.state.boardNo} togglePopUp={this.togglePopUp} />
                }
            </React.Fragment>
        );
    }
}

export default Album;