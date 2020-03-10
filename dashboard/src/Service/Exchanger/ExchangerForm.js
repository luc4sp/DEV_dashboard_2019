import React from "react";
import './../Weather/WeatherForm.css';
import addWidget from "../CreateWidget";
import addWidgetToUser from "../AddWidgetToUser";
import arrows from "../../front/arrows_exchange.png";
import './Exchanger.css';
//import WeatherForm from "../Weather/WeatherForm";

class ExchangerForm extends React.Component {
    state = {
        fromRate: "USD",
        toRate: "USD",
    };

    getListCurrency() {
        const currency = ["USD", "EUR", "CAD", "GBP", "RUB"];
        const listItems = currency.map((currency) =>
            <option value={currency.toString()} key={currency.toString()}>{currency}</option>
        );
        return (
            listItems
        );
    }

    handleChangeFrom = (e) => {
        this.setState({fromRate: e.target.value});
        e.preventDefault()
    };

    handleChangeTo = (e) => {
        this.setState({toRate: e.target.value});
        e.preventDefault()
    };

    addWidgetExchanger = async (e) => {
        e.preventDefault();
        if (this.state.fromRate === this.state.toRate)
            return;
        let data = new Object();
        data.type = 'EXCHANGER';
        data.settings = this.state.fromRate
        data.settings += "/" +  this.state.toRate;
        let tmp = await addWidget(data);
        await addWidgetToUser(tmp);
        window.location.reload()
    }

    render() {
        return (
            <div className="ExchangerStyle">
                <div className="Label-div">
                    <label className="Label">Choose a currency</label>
                </div>
                <div className="DeviseStyle">
                    <select className="SelectDevStyle" value={this.state.fromRate} onChange={this.handleChangeFrom}>
                        {this.getListCurrency()}
                    </select>
                    <img src={arrows} alt="arrows" className="Arrows"/>
                    <select className="SelectDevStyle" value={this.state.toRate} onChange={this.handleChangeTo}>
                        {this.getListCurrency()}
                    </select>
                </div>
                <div className="buttonEx" onClick={this.addWidgetExchanger}>Create Exchanger</div>
            </div>
        )
    }
}

export default ExchangerForm;