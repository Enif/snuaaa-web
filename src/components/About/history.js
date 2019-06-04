import React from 'react';

class History extends React.Component {

    //TODO : User who is admin can be edit data.
    //TODO : convert to database from json

    constructor(props) {
        super(props);

        this.state = {
            aaahistory: []
        }
    }


    componentDidMount() {
        this.generateHistoryList();
    }

    generateHistoryList = async () => {
        let historyList;

        await import('./history_tmp.json')
            .then((historys) => {
                console.dir(historys.default);
                if (historys.default) {
                    historyList = historys.default.map((his) => {
                        let occasions = his.occasion;
                        let occasionList = occasions.map((occ, idx) => {
                            return (
                                <div key={idx}>
                                    <h5>{occ.date}</h5>
                                    <p>{occ.desc}</p>
                                </div>
                            )
                        })
                        return (
                            <div className="intro-history-unit" key={his.year}>
                                <div className="unit-half">
                                    <div className="mark-year"></div>
                                    <h4>{his.year}년</h4>
                                    {occasionList}
                                </div>
                            </div>
                        )
                    })
                }
            })
            .catch((err) => {
                console.error(err)
            })

        this.setState({
            aaahistory: historyList
        })
    }


    render() {
        return (
            <div className="intro-div-wrapper" id="history">
                <div id="intro-top"></div>
                <h3>동아리 발자취</h3>
                <div className="intro-history-wrapper">
                    <div className="intro-line"></div>
                    {this.state.aaahistory}
                </div>
                <a href="#intro-top">
                    <button className="enif-btn-circle enif-pos-sticky">
                        <i className="material-icons pointer">keyboard_arrow_up</i>
                    </button>
                </a>
            </div>
        )
    }
}

export default History;