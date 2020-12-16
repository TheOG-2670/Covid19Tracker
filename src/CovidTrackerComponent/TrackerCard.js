import React, { Component } from 'react';

const initialState = {
    region: null,
    confirmed: null,
    deaths: null,
    recovered: null
}

export default class TrackerCard extends Component {
    constructor(props) {
        super(props)
        this.state = initialState;
    }

    componentDidMount() {
        var regionURL = this.props.regionName === 'Global' ?
            "https://covid19.mathdro.id/api/" :
            "https://covid19.mathdro.id/api/countries/" + this.props.regionName;

        fetch(regionURL)
            .then(response => { return response.json() })
            .then(data => {
                //console.log(data.data.confirmed)
                this.setState({
                    region: this.props.regionName,
                    confirmed: data.confirmed.value,
                    deaths: data.deaths.value,
                    recovered: data.recovered.value
                })
            })
    }

    render() {
        console.log(this.state.region)
        const covidCaseColorScheme = {}
        covidCaseColorScheme.confirmedTitle = { color: '#b3a700' }
        covidCaseColorScheme.confirmedNo = { color: '#FFD700' }
        covidCaseColorScheme.deathsTitle = { color: '#b50202' }
        covidCaseColorScheme.deathsNo = { color: '#FA8072' }
        covidCaseColorScheme.recoveredTitle = { color: '#00821c' }
        covidCaseColorScheme.recoveredNo = { color: '#90EE90' }

        return (
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div id='confirmedCases' >
                        <h5 className='card-title' style={covidCaseColorScheme.confirmedTitle}>
                            Confirmed Cases:
                        </h5>
                        <p className='card-text' style={covidCaseColorScheme.confirmedNo}>
                            {this.state.confirmed}
                        </p>
                    </div>
                </li>

                <li className="list-group-item">
                    <div id='totalDeaths' >
                        <h5 className='card-title' style={covidCaseColorScheme.deathsTitle}>
                            Total Deaths:
                        </h5>
                        <p className='card-text' style={covidCaseColorScheme.deathsNo}>
                            {this.state.deaths}
                        </p>
                    </div>
                </li>

                <li className="list-group-item">
                    <div id='totalRecovered' style={covidCaseColorScheme.recoveredTitle}>
                        <h5 className='card-title'>
                            Total Recoveries:
                        </h5>
                        <p className='card-text' style={covidCaseColorScheme.recoveredNo}>
                            {this.state.recovered}
                        </p>
                    </div>
                </li>
            </ul>
        )
    }
}