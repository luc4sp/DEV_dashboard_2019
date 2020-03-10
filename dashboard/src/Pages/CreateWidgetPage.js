import {Component } from "react";
import React from "react";
import "../Style/createwidget.css"
import WeatherForm from "../Service/Weather/WeatherForm"
import ExchangerForm from "../Service/Exchanger/ExchangerForm"
import CryptoExchangerForm from "../Service/CryptoExchanger/CryptoExchangerForm"
import CalculatorForm from "../Service/Calculator/CalculatorForm";
import PasswordGeneratorForm from "../Service/PasswordGenerator/PasswordGeneratorForm";
import RandomThingsForm from "../Service/RandomThings/RandomThingsForm";
import JokeForm from "../Service/Joker/JokeForm";

class CreateWidgetPage extends Component {
    state = {
        WidgetType: "Weather"
    }
    
    getwidgetType() {
        const widgettype = ["Weather", "Exchanger", "CryptoExchanger", "Password Generator", "Random Things", "Joke"];
        const listItems = widgettype.map((widgettype) =>
            <option value={widgettype.toString()} key={widgettype.toString()}>{widgettype}</option>
        );
        return (
            listItems
        );
    }

    handleChangeFrom = (e) => {
        this.setState({WidgetType: e.target.value});
        e.preventDefault()
    };

    render() {
        return (
            <div className={(this.state.WidgetType === undefined) ? "create-widget" : "conf-widget"} >
                <div className="select-div">
                    <select className="Select" value={this.state.widgetType} onChange={this.handleChangeFrom}>
                        {this.getwidgetType()}
                    </select>
                </div>
                <div className={(this.state.WidgetType === undefined) ? "SeparatorCreate" : "conf-div"}>
                    {(this.state.WidgetType === "Weather") ? <WeatherForm /> : (this.state.WidgetType === "Exchanger") ? <ExchangerForm /> : (this.state.WidgetType === "CryptoExchanger") ? <CryptoExchangerForm/> : (this.state.WidgetType === "Password Generator") ? <PasswordGeneratorForm /> : (this.state.WidgetType === "Random Things") ? <RandomThingsForm /> : (this.state.WidgetType === "Joke") ? <JokeForm /> :<Separator />}
                </div>
                <div className={(this.state.WidgetType === undefined) ? "button1" : "conf-button"} onClick={this.props.handleQuit}>
                    Close
                </div>
            </div>
        )
    }
}

class Separator extends Component {
    render() {
        return(
            <div></div>
        )
    }
}

export default CreateWidgetPage;