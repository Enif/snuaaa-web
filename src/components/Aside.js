import React from 'react';

class Aside extends React.Component {

    render() {
        return (
            <aside>
                <div id="lunar-info">
                    <div id="lunar-info-img"></div>
                    <h5>오늘의 날짜 정보</h5>
                    <table id="lunar-info-tb">
                        <tbody>
                            <tr>
                                <td>양력 05/25</td>
                                <td>음력 04/11</td>
                            </tr>
                            <tr>
                                <td>일출 05:16</td>
                                <td>일몰 19:42</td>
                            </tr>
                            <tr>
                                <td>월출 15:19</td>
                                <td>월몰 02:56</td>
                            </tr>
                            <tr>
                                <td colSpan="2">시민박명 04:46 / 20:12</td>
                            </tr>
                            <tr>
                                <td colSpan="2">항해박명 04:46 / 20:50</td>
                            </tr>
                            <tr>
                                <td colSpan="2">천문박명 03:46 / 20:31</td>
                            </tr>
                        </tbody>                        
                    </table>
                </div>
            </aside>
        );
    }
}

export default Aside