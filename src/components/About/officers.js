import React from 'react';
import officers from './officers_tmp.json'

class Officers extends React.Component {

    //TODO : User who is admin can be edit data.
    //TODO : convert to database from json

    generateOfficerList = () => {
        let officerList = officers.map((gen) => {
            return (
                <div className="gen-wrapper" key={gen.generation}>
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
        return (

            <div className="intro-div-wrapper" id="officers">
                <div id="intro-top"></div>
                <h3>역대 회장단 / 임원진</h3>
                <div className="intro-content officers-wrapper">
                    {this.generateOfficerList()}
                </div>
            </div>
        )
    }
}

export default Officers;