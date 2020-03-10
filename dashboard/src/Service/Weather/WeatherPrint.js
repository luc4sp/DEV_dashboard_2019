import React from "react";
import './Weather.css'
import UpdateWidgetSettings from "../UpdateWidget";
import disconnectWidget from "../DeleteWidget";

const Api_Key = "a16d368a36d2d79e389453d08b8464e6";

class WeatherPrint extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            country:undefined,
            city: undefined,
            tmpcity: undefined,
            temperature: undefined,
            description: undefined,
            error: undefined,
            onChange: false,
            id: undefined,
        }
    }

    changeWidgetSettings = (e) => {
        e.preventDefault();
        let tmp = true;
        if (this.state.onChange === true)
            tmp = false;
        this.setState({tmpcity: this.state.city});
        this.setState({onChange: tmp})
    };

    componentDidMount = async () => {
        this.setState({id: this.props.id});
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.props.settings}&appid=${Api_Key}&units=metric`);
        const response = await api_call.json();
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
    };

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            city: e.target.value
        });
    };

    updateWidgetWeather = async () => {
        let data = {};
        data.id = this.state.id;
        data.settings = this.state.city;
        await UpdateWidgetSettings(data);
        this.setState({ onChange: false});
    };

    deleteWidget = async () => {
        let data = {};
        data.id = this.state.id;
        await disconnectWidget(data)
        window.location.reload()
    };

    render(){

        let print =
            <div>
                {
                    this.state.city && <p style={{margin: '20px'}}>Location:
                        <span> {this.state.country} {this.state.city} </span>
                    </p>
                }

                {
                    this.state.temperature && <p style={{margin: '15px'}}>Temperature:
                        <span>  {this.state.temperature} °C</span>
                    </p>
                }

                {
                    this.state.description && <p style={{margin: '15px'}}>Conditions:
                        <span>  {this.state.description}</span>
                    </p>
                }

                {
                    this.state.error && <p style={{margin: '15px'}}>{this.state.error}</p>
                }
            </div>;
        let change =
            <div className="EditWeather">
                <label className="LabelStyle">Enter a new city</label>
                <input className="InputStyle" onChange={this.handleChange} type="text" name="city" placeholder="City..."/>
                <div className='Button1' onClick={this.updateWidgetWeather}>Update Weather</div>
            </div>;
        return(
            <div className='Back-widget'>
                <div className="TopButtons">
                    <div className="Button2" onClick={this.changeWidgetSettings}>.</div>
                    <div className="ButtonDel" onClick={this.deleteWidget}>.</div>
                </div>
                {this.state.onChange === false ? print : change}
            </div>
        )
    }
}

export default WeatherPrint;