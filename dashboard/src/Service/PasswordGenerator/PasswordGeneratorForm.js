import React from "react";
import '../Weather/WeatherForm.css';
import addWidget from "../CreateWidget";
import addWidgetToUser from "../AddWidgetToUser";

class PasswordGeneratorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 8,
            complexity: "Alpha"
        };
    }

    getListComplexity() {
        const currency = ["Alpha", "Alpha, Num", "Alpha, Num & Special"];
        const listItems = currency.map((currency) =>
            <option value={currency.toString()} key={currency.toString()}>{currency}</option>
        );
        return (
            listItems
        );
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({length: e.target.value});
    };

    handleChangeSelect = (e) => {
        e.preventDefault();
        this.setState({complexity: e.target.value});
    };

    addWidgetPasswordGenerator = async (e) => {
        e.preventDefault();
        if (this.state.length < 4)
            return;
        let data = {};
        data.type = 'PASSWORD';
        data.settings = this.state.length;
        data.settings += "/" + this.state.complexity;
        let WidgetId = await addWidget(data);
        await addWidgetToUser(WidgetId);
        window.location.reload()
    };

    render() {
        return (
            <div className='ExchangerStyle'>
                <div>
                    <h3>Password lenght :</h3>
                    <input type="number" value={this.state.length} onChange={this.handleChange} min="4" max="32"/>
                </div>
                <div>
                    <h3>Password Complexity :</h3>
                    <select value={this.state.complexity} onChange={this.handleChangeSelect}>
                        {this.getListComplexity()}
                    </select>
                </div>
                <div className="buttonEx" onClick={this.addWidgetPasswordGenerator}>Create Widget</div>
            </div>
        )
    }
}

export default PasswordGeneratorForm;