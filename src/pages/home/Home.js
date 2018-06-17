import React from 'react';

class Home extends React.Component {
    render() {
        return (
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
                <div id="soundbox-wrapper" className="content">
                    <div id="soundbox-title">NOTICE</div>
                    <div id="soundbox-contents-wrapper">
                        <div id="soundbox-content" className="content">    
                            <h5>77대 총회 공지</h5>
                            <p>다음주 토요일(5/26) 13시 30분부터 28동 101호에서 76대 정기총회가 있습니다. 
                                77대 유세 13:30 기조 14:30 운영 15:00 행사 15:30 회계 16:30 
                                관측부 1부 17:30 정회원 인준식 18:00~19:00 (고정) 저녁식사 19:00~19:30 (고정) 
                                관측부 2부 19:30 디딤돌 21:00 개표 및 결과 공고 22:00 폐회 22:30 순으로 계획했고, 
                                상황에 따라 유동적으로 진행할 수 있음에 유의해주세요. 많은 참여를 바랍니다.
                            </p>
                        </div>
                    </div>
                    <div id="soundbox-img"></div>
                </div>
            </div>
        );
    }
}

export default Home