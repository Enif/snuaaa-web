import React from 'react'
import * as service from 'services';
import { convertDateWithDay, convertTime } from 'utils/convertDate';

class RiseSet extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            riseSetInfo: {}
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = async () => {
        service.retrieveRiseSet()
            .then((res) => {
                this.setState({
                    riseSetInfo: {...res.data}
                })
            })
            .catch((err) => {
                console.error(err);
            })
    }

    render() {
        const today = new Date();
        const { riseSetInfo } = this.state;

        return (
            <div className="rise-set-wrapper">
                <div className="moon-phase-wrapper">
                    <div className="moon-phase"></div>
                </div>
                <h5>{convertDateWithDay(today)}</h5>
                <p>일출 {convertTime(riseSetInfo.sunrise)} / 일몰 {convertTime(riseSetInfo.sunset)}</p>
                <p>월출 {convertTime(riseSetInfo.moonrise)} / 월몰 {convertTime(riseSetInfo.moonset)}</p>
                <p>천문박명 {convertTime(riseSetInfo.astm)} / {convertTime(riseSetInfo.aste)} </p>
            </div>
        )
    }


}

export default RiseSet;
