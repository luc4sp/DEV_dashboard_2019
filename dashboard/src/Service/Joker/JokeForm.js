import React from "react";
import addWidget from "../CreateWidget";
import addWidgetToUser from "../AddWidgetToUser";
import './Joke.css';

class JokeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "Programming"
        };
    }

    getListCategories() {
        const categories = ["Programming","Miscellaneous","Dark","Any"];
        const listItems = categories.map((categories) =>
            <option value={categories.toString()} key={categories.toString()}>{categories}</option>
        );
        return (
            listItems
        );
    }

    handleChange = (e) => {
        this.setState({category: e.target.value});
        e.preventDefault()
    };

    addWidgetJoker = async (e) => {
        e.preventDefault();
        let data = {};
        data.type = 'JOKE';
        data.settings = this.state.category;
        let tmp = await addWidget(data);
        await addWidgetToUser(tmp);
        window.location.reload()
    };

    render() {
        return (
            <div className="ExchangerStyle">
                <div className="Label-div">
                    <label className="Label">Choose a Category of joke</label>
                </div>
                <div>
                    <select value={this.state.category} onChange={this.handleChange}>
                        {this.getListCategories()}
                    </select>
                </div>
                <div className="buttonEx" onClick={this.addWidgetJoker}>Create Joker</div>
            </div>
        )
    }
}

export default JokeForm;