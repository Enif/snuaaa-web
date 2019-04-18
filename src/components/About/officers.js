import React from 'react';
import { fstat } from 'fs';
import officers from './officers_tmp.json'

class Officers extends React.Component {

    //TODO : User who is admin can be edit data.
    //TODO : convert to database from json

    generateOfficerList = () => {
        console.log(officers)
        let officerList = officers.map((gen) => {
            return (
                <div className="gen-wrapper">
                    <div className="generation">
                        {gen.generation}대
                    </div>
                    <div className="member">
                        <div className="president">
                            {gen.president}
                        </div>
                        <div className="officers">
                            {gen.officers}
                        </div>
                    </div>
                </div>
            )
        })
        return officerList;
    }

    render() {
        return(

            <div className="intro-div-wrapper" id="officers">
                <h3>역대 회장단 / 임원진</h3>
                <div className="intro-content officers-wrapper">
                    {this.generateOfficerList()}
                </div>

                <table border="0" cellPadding="5" cellSpacing="2" width="758">
                    <colgroup>
                        <col width="50" />
                        <col width="70" />
                        <col width="638" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>회기</td>
                            <td>회장</td>
                            <td>회장단 / 임원진</td>
                        </tr>
                        
                        <tr>
                            <td>62 대</td>
                            <td>곽세종</td>
                            <td >부회장:김치균, 총무:김영재, 회계:황혜진, 디딤돌장:박종호<br /><br />관측부장:사세영, 이동하</td>
                        </tr>
                        <tr>
                            <td>61 대</td>
                            <td>박종호</td>
                            <td >부회장:김규태, 총무:이다정, 회계:남선화, 디딤돌장:정성엽<br /><br />관측부장:곽세종, 김태석</td>
                        </tr>
                        <tr>
                            <td>60 대</td>
                            <td>윤창수</td>
                            <td >총무:곽세종, 회계:이성현, 디딤돌짱:박황필<br /><br />관측부장:김은주,박종호, 멘토부장:김치균,김태석</td>
                        </tr>
                        <tr>
                            <td>59 대</td>
                            <td>박기수</td>
                            <td >부회장:조기운, 총무:윤창수, 회계:원준희, 디딤돌짱:윤서영<br /><br />관측부장:김용진,박황필, 학술부장:강석호</td>
                        </tr>
                        <tr>
                            <td>58 대</td>
                            <td>이윤백</td>
                            <td >부회장:양시엽, 총무:박기수, 회계:윤서영, 디딤돌짱:이홍민<br /><br />관측부장:박영선,강세지, 학술부장:이종수,정보슬</td>
                        </tr>
                        <tr>
                            <td>57 대</td>
                            <td>이홍민</td>
                            <td >부회장:이지영, 총무:정민수, 회계:심예원, 디딤돌짱:정진영<br /><br />관측부장:권은화,박준영,이윤백,최용연</td>
                        </tr>
                        <tr>
                            <td>56 대</td>
                            <td>김기현</td>
                            <td >	</td>
                        </tr>
                        <tr>
                            <td>55 대</td>
                            <td>공혜원</td>
                            <td >부회장:김완희, 총무:이지은, 회계:김지혜, 디딤돌짱:권기연</td>
                        </tr>
                        <tr>
                            <td>54 대</td>
                            <td>한경호</td>
                            <td >부회장:정한솔, 총무:공혜원,권기연, 회계:이지은, 디딤돌짱:이수빈<br /><br />관측부장:김기현,김완희,박대일,조기욱</td>
                        </tr>
                        <tr>
                            <td>53 대</td>
                            <td>정찬영</td>
                            <td >부회장:이수빈, 총무:정한솔, 회계:손정아, 디딤돌짱:한경호</td>
                        </tr>
                    <tr>
                        <td>52 대</td>
                        <td>강승연</td>
                        <td >부회장:권경석, 총무:정찬영, 회계:이예지, 디딤돌짱:심규연<br /><br />관측부장:연지훈,이수빈,한경호, 학술부장:양태수,최영욱</td></tr>
                    <tr>
                        <td>51 대</td>
                        <td>김형철</td>
                        <td >부회장:심규연, 총무:강승연,오세창, 회계:김희섭, 디딤돌짱:권경석</td></tr>
                    <tr>
                        <td>50 대</td>
                        <td>임수현</td>
                        <td >부회장:이시운, 총무:심규연, 회계:김형철, 디딤돌짱:김응찬<br /><br />관측부장:배연정,조용경, 문소부장:강경탁,권경석, 편집부장:이두희,박혜영, 학술부장:홍영선</td></tr>
                    <tr>
                        <td>49 대</td>
                        <td>이효건</td>
                        <td >부회장:이진희, 총무:김중규, 회계:최민진, 디딤돌짱:박종선<br /><br />관측부장:김응찬,이희정,임수현, 문화소식부장:김미미,이봉실, 편집부장:정가영,정은애, 학술부장:연지혜,정영훈</td></tr>
                    <tr>
                        <td>48 대</td>
                        <td>이  명</td>
                        <td >부회장:강재욱, 총무:강윤아, 회계:이희정, 디딤돌짱:김형국<br /><br />관측부장:김중규,임수현, 문소부장:이진희,정가영, 편집부장:서정화,이상향, 학술부장:이효건,최민진</td></tr>
                    <tr>
                        <td>47 대</td>
                        <td>홍진우</td>
                        <td >부회장:김형국, 총무:이승희, 회계:박민신<br /><br />관측부장:천세환, 문화소식부장:강재욱,윤지영, 학술부장:이명</td></tr>
                    <tr>
                        <td>46 대</td>
                        <td>김현수</td>
                        <td >부회장:구준모, 총무:이명, 회계:이수연<br /><br />관측부장:김덕형,홍진우, 문화소식부장:김형국,박주영, 학술부장:이승희,천세환</td></tr>
                    <tr>
                        <td>45 대</td>
                        <td>김창구</td>
                        <td >부회장:김현수, 총무:이옥환, 회계:홍기철<br /><br />관측부장:박희영, 이벤트부장:구준모,김정훈, 학술부장:김훈민</td></tr>
                    <tr>
                        <td>44 대</td>
                        <td>김도윤</td>
                        <td >부회장:윤성준, 총무:김창구, 회계:홍라현, 편집담당원:김정훈<br /><br />관측부장:김성민,김현수, 이벤트부장:이옥환,한지현, 학술부장:곽호정,김경화</td></tr>
                    <tr>
                        <td>43 대</td>
                        <td>김재국</td>
                        <td >부회장:김정훈, 총무:김기표,김도윤, 회계:임은경<br /><br />학술부장:이주현, 관측부장:정범균,황성욱, 이벤트부장:성윤제,양재원</td></tr>
                    <tr>
                        <td>42 대</td>
                        <td>전태영</td>
                        <td >부회장:조윤석, 총무:김재국,배동환 회계:신원희, 디딤돌짱:이용석<br /><br />관측부장:윤주희,제승환, 문화생활부장:김도연,윤성준, 편집부장:김교문,이활리, 학술부장:권영제,김정훈</td></tr>
                    <tr>
                        <td>41 대</td>
                        <td>이용석</td>
                        <td >부회장:김재호, 총무:성동윤, 회계:신승하<br /><br />관측부장:장준환,최성배, 학술부장:김은경,장지웅, 편집부장:이지영,최승희, 문화생활부장:김승현,황상현</td></tr>
                    <tr>
                        <td>40 대</td>
                        <td>김영환</td>
                        <td >부회장:김효선, 총무:정영민, 회계:김은경,손은우, 디딤돌짱:도관표<br /><br />관측부장:김재호,백재선,이용석, 학술부장:신정민,전태영, 편집부장:정근희,박소영, 문화홍보부장:정석현, 생활부장:문재원,최승희</td></tr>
                
                </tbody></table>
                <a href="#intro-top"><p>top</p></a>
            </div>
        )
    }
}

export default Officers;