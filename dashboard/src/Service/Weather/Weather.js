import React, { Component } from 'react';
import WeatherPrint from "./WeatherPrint";
import WeatherForm from "./WeatherForm";
import "./Weather.css"

const Api_Key = "a16d368a36d2d79e389453d08b8464e6";

class Weather extends Component {
    state = {
        temperature: undefined,
        city: '',
        country: undefined,
        description: undefined,
        error: undefined,
    }

    handleChange(event) {
        this.setState({city: event.target.value});
    }

    getWeather = async (e) => {
        console.log("lol");
        const city = e.target.elements.city.value;
        e.preventDefault();
        console.log (city)
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}&units=metric`);
        const response = await api_call.json();
        console.log(response);
        if (response.cod !== "404") {
            this.setState( {
                temperature: response.main.temp,
                city: response.name,
                description: response.weather[0].description,
                country: response.sys.country
            })
        } else {
            this.setState({
                error: "Bad city name"
            })
        }
    }

    render() {
        return (
            <div className="Back-widget">
                <WeatherForm loadWeather={this.getWeather} />
                    <WeatherPrint
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                    />
            </div>
        )
    }
}

export default Weather;