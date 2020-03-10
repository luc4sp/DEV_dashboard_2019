import React, { Component } from 'react';
import "./Exchanger.css"
import arrows from "../../front/arrows_exchange.png"

class Exchanger extends Component {
    state = {
        fromCurrency: undefined,
        toCurrency: undefined,
        rate: undefined,
        rateInversed: undefined,
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
        console.log(e.target.value);
        this.setState({fromCurrency: e.target.value});
        e.preventDefault()
    };

    handleChangeTo = (e) => {
        console.log(e.target.value);
        this.setState({toCurrency: e.target.value});
        e.preventDefault()
    };

    printValues = () => {
        if (this.state.rate !== undefined) {
            return (<h1>1 {this.state.fromCurrency} = {parseFloat(this.state.rate).toFixed(2)} {this.state.toCurrency}</h1>)
        }
    };
    printValuesInversed = () => {
        if (this.state.rate !== undefined) {
            return (<h1>1 {this.state.toCurrency} = {parseFloat(this.state.rateInversed).toFixed(2)} {this.state.fromCurrency}</h1>)
        }
    };

    findMoney = async () => {
        let from = this.state.fromCurrency;
        const api_call = await fetch(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${this.state.toCurrency}`);
        const response = await api_call.json();
        if (response.error !== undefined)
            return;
        for (let [key, value] of Object.entries(response.rates)) {
            this.setState({rate : `${value}` });
        }
        const inversedRate = 1.0 / parseFloat(this.state.rate);
        console.log({inversedRate});
        this.setState({
            rateInversed: inversedRate,
        });
    };

    render() {
        return (
         <div className="ExchangerStyle">
             <div className="Label-div">
                 <label className="Label">Choose a currency</label>
             </div>
             <div className="DeviseStyle">
                <select className="SelectDevStyle" value={this.state.fromCurrency} onChange={this.handleChangeFrom}>
                   {this.getListCurrency()}
                </select>
                 <img src={arrows} alt="arrows" className="Arrows"/>
                <select className="SelectDevStyle" value={this.state.toCurrency} onChange={this.handleChangeTo}>
                    {this.getListCurrency()}
                </select>
             </div>
             <div className="buttonEx" onClick={this.findMoney}>Create Exchanger</div>
                <div>
                    {this.printValues()}
                </div>
             <div>
                 {this.printValuesInversed()}
             </div>
         </div>
        )
    }
}

export default Exchanger;