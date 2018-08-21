import React from 'react';

class Board extends React.Component {
    render() {
        return (
            <div id="contents-center">
                <div className="board-wrapper">
                    <h2>천기누설</h2>
                    {/* list */}
                    <div className="post-list">
                        {/* post */}
                        <div className="post-wrapper">
                            {/* number */}
                            <div className="post-number">
                                300
                            </div>
                            <div className="post-title">
                                <h5>180716, 180718, 180719 소관 후기 :) [1]</h5>
                            </div>
                            <div className="post-author">
                                17최진아
                            </div>
                        </div>
                        {/* post */}
                        <div className="post-wrapper">
                            <div className="post-number">
                                299
                            </div>
                            <div className="post-title">
                                <h5>2018년 7월 18일 (수) 조경철 천문대 소관 후기 [2]</h5>
                            </div>
                            <div className="post-author">
                                15정만근
                            </div>
                        </div>
                        {/* post */}
                        <div className="post-wrapper">
                            <div className="post-number">
                                298
                            </div>
                            <div className="post-title">
                                <h5>180615 백마고지 소관후기 [1]</h5>
                            </div>
                            <div className="post-author">
                                17금민주
                            </div>
                        </div>
                        {/* post */}
                        <div className="post-wrapper">
                            <div className="post-number">
                                297
                            </div>
                            <div className="post-title">
                                <h5>2018년 7월 18일 (수) 조경철 천문대 소관 후기[2]</h5>
                            </div>
                            <div className="post-author">
                                15정만근
                            </div>
                        </div>
                        {/* post */}
                        <div className="post-wrapper">
                            <div className="post-number">
                                296
                            </div>
                            <div className="post-title">
                                <h5>2018년 7월 18일 (수) 조경철 천문대 소관 후기[2]</h5>
                            </div>
                            <div className="post-author">
                                15정만근
                            </div>
                        </div>
                        {/* post */}
                        <div className="post-wrapper">
                            <div className="post-number">
                                295
                            </div>
                            <div className="post-title">
                                <h5>2018년 7월 18일 (수) 조경철 천문대 소관 후기[2]</h5>
                            </div>
                            <div className="post-author">
                                15정만근
                            </div>
                        </div>
                        {/* post */}
                        <div className="post-wrapper">
                            <div className="post-number">
                                294
                            </div>
                            <div className="post-title">
                                <h5>2018년 7월 18일 (수) 조경철 천문대 소관 후기[2]</h5>
                            </div>
                            <div className="post-author">
                                15정만근
                            </div>
                        </div>
                        {/* post */}
                        <div className="post-wrapper">
                            <div className="post-number">
                                293
                            </div>
                            <div className="post-title">
                                <h5>2018년 7월 18일 (수) 조경철 천문대 소관 후기[2]</h5>
                            </div>
                            <div className="post-author">
                                15정만근
                            </div>
                        </div>
                        {/* post */}
                        <div className="post-wrapper">
                            <div className="post-number">
                                292
                            </div>
                            <div className="post-title">
                                <h5>2018년 7월 18일 (수) 조경철 천문대 소관 후기[2]</h5>
                            </div>
                            <div className="post-author">
                                15정만근
                            </div>
                        </div>
                    </div>

                    {/* <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>글쓴이</th>

                            </tr>
                        </tbody>
                    </table> */}

                    <button>글쓰기</button>
                </div>
            </div>
        );
    }
}

export default Board