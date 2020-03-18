import React, { Component } from 'react';
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weatherLocation: null,
            isLoading: true
        }
    }
    currentWeather = async (lat, lng) => {
        try {
            const api = "9a463edf742742fb40902ce523ab2383"
            console.log(process.env.REACT_APP_HUNG)
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api}`
            let data = await fetch(url)
            let result = await data.json()
            console.log(result.cod)
            if (result.cod * 1 === 200) {
                console.log('result', result)
                this.setState({
                    weatherLocation: result,
                    isLoading: false
                })
            } else {
                // throw alert("Data could not be fetched Error 404 is Not Found")
                throw new Error(data.message = alert("Data could not be fetched Error 404 is Not Found"))
            }
        } catch(error) {
            console.log(error)
        }
          
    }


    getLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            this.currentWeather(position.coords.latitude, position.coords.longitude);
        });
    };

    componentDidMount() {
        this.getLocation()

    }

    convertFtoC = (f) => {
        return ((f - 273.15)*1.8)+32
    }

    convertKtoC = (k) => {
        return k - 273.15
    }


    render() {
        let { isLoading } = this.state
        if (isLoading) {
            return (
                <div className="sweet-loading">
                    <CircleLoader
                        css={override}
                        size={150}
                        color={"#123abc"}
                        loading={isLoading}
                    />
                </div>
            )
        }
        return (
            <div className="container-fluid text-white my-auto">
                <div className="container mx-auto my-4 py-4">
                    <div className="row justify-content-center text-center">
                        <h1 className="col-12 display-4 my-2 py-3 text-success">
                            Awesome Weather App
                    </h1>
                        <h2 className="col-12">{this.state.weatherLocation.name}</h2>
                        <h3 className="col-12 text-danger">{`${this.convertFtoC(this.state.weatherLocation.main.temp)} °F / ${this.convertKtoC(this.state.weatherLocation.main.temp)}°C`}</h3>
                        <h3 className="col-12">{this.state.weatherLocation.weather[0].description}</h3>
                    </div>
                </div>
            </div>
        )
    }
}


export default App;
