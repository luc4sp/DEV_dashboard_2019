import React from "react";
import './WeatherForm.css';
import addWidget from "../CreateWidget";
import addWidgetToUser from "../AddWidgetToUser";

class WeatherForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: undefined,
        };
    }

    handleChange = (e) => {
        this.setState({
            city: e.target.value
        });
    };

    addWidgetWeather = async (e) => {
        e.preventDefault();
        if (this.state.city === undefined)
            return
        let data = new Object();
        data.type = 'WEATHER';
        data.settings = this.state.city;
        let tmp = await addWidget(data);
        await addWidgetToUser(tmp);
        window.location.reload()
    };

    render() {
        return (
            <form className="FormStyle">
                <label className="LabelStyle">Enter a city</label>
                <input className="InputStyle" onChange={this.handleChange} type="text" name="city" placeholder="City..."/>
                <div className='buttonCreate' onClick={this.addWidgetWeather}>Create Weather</div>
            </form>

        )
    }
}

export default WeatherForm;