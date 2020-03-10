import React from "react";
import './Crypto.css'
import '../Weather/Weather.css'
import UpdateWidgetSettings from "../UpdateWidget";
import disconnectWidget from "../DeleteWidget";

class CryptoExchangerPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crypto: undefined,
            name: undefined,
            price: undefined,
            onChange: false,
            id: undefined,
        };
    }

    componentDidMount = async () => {
        this.setState({crypto: this.props.settings, id: this.props.id});
        let res = await fetch(`https://api.coincap.io/v2/assets/${this.props.settings}`);
        let resp = await res.json();
        for (let [key, value] of Object.entries(resp.data)) {
            if (key === "name")
                this.setState({name: value});
            if (key === "priceUsd")
                this.setState({price: value});
        }
    };

    getListCurrency() {
        const currency = ["bitcoin", "ethereum", "litecoin", "monero", "tether", "bitcoin-cash"];
        const listItems = currency.map((currency) =>
            <option value={currency.toString()} key={currency.toString()}>{currency}</option>
        );
        return (
            listItems
        );
    }

    changeWidgetSettings = (e) => {
        e.preventDefault();
        let tmp = true;
        if (this.state.onChange === true)
            tmp = false;
        this.setState({onChange: tmp})
    };

    handleChange = (e) => {
        this.setState({crypto: e.target.value});
        e.preventDefault()
    };

    updateCryptoExchanger = async () => {
       let data = {};
       data.id = this.state.id;
       data.settings = this.state.crypto;
        await UpdateWidgetSettings(data);
        this.setState({ onChange: false});
    };

    deleteWidget = async () => {
        let data = {};
        data.id = this.state.id;
        await disconnectWidget(data)
        window.location.reload()
    };

    render() {
        let print =
            <div>
                <h1> 1 {this.state.crypto} cost {parseFloat(this.state.price).toFixed(2)} USD</h1>
            </div>;
        let change =
            <div className="EditCrypto">
                <div className="">
                    <label className="">Choose a currency</label>
                </div>
                <div>
                    <select className="SelectCrypto" value={this.state.crypto} onChange={this.handleChange}>
                        {this.getListCurrency()}
                    </select>
                </div>
                <div className="ButtonCrypto" onClick={this.updateCryptoExchanger}>Update CryptoExchanger</div>

            </div>;
        return (
            <div className='Back'>
                <div className="TopButtons">
                    <div className="Button2" onClick={this.changeWidgetSettings}>.</div>
                    <div className="ButtonDel" onClick={this.deleteWidget}>.</div>
                </div>
                {this.state.onChange === false ? print : change}
            </div>
        )
    }
}

export default CryptoExchangerPrint;