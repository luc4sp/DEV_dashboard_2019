import React from "react";
import '../Weather/WeatherForm.css';
//import '../Exchanger/Exchanger.css'
import addWidget from "../CreateWidget";
import addWidgetToUser from "../AddWidgetToUser";

class CryptoExchangerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: "bitcoin"
        };
    }

    getListCurrency() {
        const currency = ["bitcoin", "ethereum", "litecoin", "monero", "tether", "bitcoin-cash"];
        const listItems = currency.map((currency) =>
            <option value={currency.toString()} key={currency.toString()}>{currency}</option>
        );
        return (
            listItems
        );
    }

    handleChange = (e) => {
        this.setState({rate: e.target.value});
        e.preventDefault()
    };

    addWidgetCryptoExchanger = async (e) => {
        e.preventDefault();
        if (this.state.rate === undefined)
            return;
        let data = new Object();
        data.type = 'CRYPTOEXCHANGER';
        data.settings = this.state.rate
        let tmp = await addWidget(data);
        await addWidgetToUser(tmp);
        window.location.reload()
    };

    render() {
        return (
            <div className="ExchangerStyle">
                <div className="Label-div">
                    <label className="Label">Choose a currency</label>
                </div>
                <div>
                    <select value={this.state.rate} onChange={this.handleChange}>
                        {this.getListCurrency()}
                    </select>
                </div>
                <div className="buttonEx" onClick={this.addWidgetCryptoExchanger}>Create CryptoExchanger</div>
            </div>
        )
    }
}

export default CryptoExchangerForm;