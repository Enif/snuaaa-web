import React from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import SoundBox from '../../components/Home/SoundBox';

const TAG = 'HOME'

class Home extends React.Component {
    constructor(props){
        super(props)
    }

    render() {

        const { loginState } = this.props
        return (
            loginState ?
            (
                <div id="contents-center">
                    <div id="calendar-wrapper" className="content">
                        <div className="title-left">
                            <h5>천문현상 &amp; 일정</h5>
                        </div>
                        <div className="title-right">
                            <h5>2018년 5월</h5>
                        </div>
                        
                        <table id="calendar-tb">
                            <tbody>
                                <tr>
                                    <th>25(Fri)</th>
                                    <th>26(Sat)</th>
                                    <th>27(Sun)</th>
                                    <th>28(Mon)</th>
                                    <th>29(Tue)</th>
                                    <th>30(Wed)</th>
                                    <th>31(Thu)</th>
                                </tr>
                                <tr>
                                    <td>불금</td>
                                    <td>77대 총회</td>
                                    <td>일요일</td>
                                    <td>월요병</td>
                                    <td></td>
                                    <td></td>
                                    <td>5월 안녕모임~</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <SoundBox />
                </div>
            )
            :
            (
                <Redirect to='/login' />
            )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginState: state.authentication.isLoggedIn
    }
}

export default connect(mapStateToProps, undefined)(Home);
