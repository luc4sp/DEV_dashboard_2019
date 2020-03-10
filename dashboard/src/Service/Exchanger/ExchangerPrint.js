import React from 'react';
import './Exchanger.css';
import '../Weather/Weather.css'
import arrows from "../../front/arrows_exchange.png";
import UpdateWidgetSettings from "../UpdateWidget";
import disconnectWidget from "../DeleteWidget";

class ExchangerPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromCurrency: undefined,
            rate: undefined,
            toCurrency: undefined,
            rateInversed: undefined,
            words: undefined,
            onChange: false,
            id: undefined,
        };
    }

    componentDidMount = async () => {
        var words = this.props.settings.split('/');
        this.setState({words: words, id: this.props.id});
        const api_call = await fetch(`https://api.exchangeratesapi.io/latest?base=${words[0]}&symbols=${words[1]}`);
        const response = await api_call.json();
        if (response.error !== undefined)
            return;
        for (let [key, value] of Object.entries(response.rates)) {
            this.setState({rate : `${value}` });
        }
        const inversedRate = 1.0 / parseFloat(this.state.rate);
        this.setState({
            rateInversed: inversedRate,
        });
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

    update = async() => {
        const api_call = await fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`);
        const response = await api_call.json();
        if (response.error !== undefined)
            return;
        for (let [key, value] of Object.entries(response.rates)) {
            this.setState({rate : `${value}` });
        }
        const inversedRate = 1.0 / parseFloat(this.state.rate);
        this.setState({
            rateInversed: inversedRate,
        });
    };

    changeWidgetSettings = (e) => {
        e.preventDefault();
        let tmp = true;
        if (this.state.onChange === true)
            tmp = false;
        this.setState({onChange: tmp})
    };

    printValues = () => {
        if (this.state.rate !== undefined) {
            return (<h1>1 {this.state.words[0]} = {parseFloat(this.state.rate).toFixed(2)} {this.state.words[1]}</h1>)
        }
    };

    printValuesInversed = () => {
        if (this.state.rate !== undefined) {
            return (<h1>1 {this.state.words[1]} = {parseFloat(this.state.rateInversed).toFixed(2)} {this.state.words[0]}</h1>)
        }
    };

    handleChangeFrom = (e) => {
        this.setState({fromCurrency: e.target.value});
        e.preventDefault()
    };

    handleChangeTo = (e) => {
        this.setState({toCurrency: e.target.value});
        e.preventDefault()
    };

    updateWidgetExchanger = async () => {
        let data = {};
        if (this.state.fromCurrency === this.state.toCurrency)
            return;
        data.id = this.state.id;
        data.settings = this.state.fromCurrency + "/" + this.state.toCurrency;
        await UpdateWidgetSettings(data);
        await this.update();
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
                <div className="ExchangerPrintLabel">
                    {this.printValues()}
                </div>
                <div className="ExchangerPrintLabel2">
                    {this.printValuesInversed()}
                </div>
            </div>;

        let change =
            <div className="EditExchanger">
                <div className="Label-div">
                    <label className="LabelUpdate">Choose a currency</label>
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
                <div className="Button1" onClick={this.updateWidgetExchanger}>Update Exchanger</div>
            </div>;

        return (
            <div className='ExchangerPrint'>
                <div className="TopButtons">
                    <div className="Button2" onClick={this.changeWidgetSettings}>.</div>
                    <div className="ButtonDel" onClick={this.deleteWidget}>.</div>
                </div>
                {this.state.onChange === false ? print : change}
            </div>
        )
    }
}

export default ExchangerPrint;