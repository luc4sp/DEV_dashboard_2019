import React from "react";
import '../Weather/WeatherForm.css';
import addWidget from "../CreateWidget";
import addWidgetToUser from "../AddWidgetToUser";

class RandomThingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "trivia",
        };
    }

    getListType() {
        const type = ["trivia", "year", "date", "math"];
        const listItems = type.map((type) =>
            <option value={type.toString()} key={type.toString()}>{type}</option>
        );
        return (
            listItems
        );
    }

    handleChange = (e) => {
        this.setState({type: e.target.value});
        e.preventDefault()
    };

    addWidgetRandomThing = async (e) => {
        e.preventDefault();
        let data = new Object();
        data.type = 'RANDOMTHING';
        data.settings = this.state.type;
        let tmp = await addWidget(data);
        await addWidgetToUser(tmp);
        window.location.reload()
    };

    render() {
        return (
            <div className="ExchangerStyle">
                <div className="Label-div">
                    <label className="Label">Choose a theme</label>
                </div>
                <div>
                    <select value={this.state.type} onChange={this.handleChange}>
                        {this.getListType()}
                    </select>
                </div>
                <div className="buttonEx" onClick={this.addWidgetRandomThing}>Create CryptoExchanger</div>
            </div>
        )
    }
}

export default RandomThingsForm;