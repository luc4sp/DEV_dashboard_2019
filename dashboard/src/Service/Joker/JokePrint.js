import React from 'react';
import './Joke.css';
import '../Weather/Weather.css'
import UpdateWidgetSettings from "../UpdateWidget";
import disconnectWidget from "../DeleteWidget";

class JokePrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: undefined,
            id: undefined,
            joke: undefined,
            onChange: false,
        }
    };

    componentDidMount = async () => {
        this.setState({
            id:this.props.id,
            category: this.props.settings,
        })
        let res = await fetch(`https://sv443.net/jokeapi/category/${this.props.settings}?`);
        let resp = await res.json();
        let tmp = String(resp.joke);
        if (resp.type !== "single" || tmp.length > 100) {
            while (resp.type !== "single" || tmp.length > 100) {
                res = await fetch(`https://sv443.net/jokeapi/category/${this.props.settings}?`);
                resp = await res.json();
                tmp = String(resp.joke)
            }
        }
        this.setState({
            joke: resp.joke,
        })
    };

    changeWidgetSettings = (e) => {
        e.preventDefault();
        let tmp = true;
        if (this.state.onChange === true)
            tmp = false;
        this.setState({onChange: tmp})
    };

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

    updateJoke = async () => {
        let data = {};
        data.id = this.state.id;
        data.settings = this.state.category;
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
                <h4>{this.state.joke}</h4>
            </div>;

        let change =
            <div>
                <div className="Label-div">
                    <label className="Label">Choose a Category</label>
                </div>
                <div>
                    <select value={this.state.category} onChange={this.handleChange}>
                        {this.getListCategories()}
                    </select>
                </div>
                <div className="ButtonCrypto" onClick={this.updateJoke}>Update Joke</div>

            </div>;

        return (
            <div className='Back-widgetJoke'>
                <div className="TopButtons">
                    <div className="Button2" onClick={this.changeWidgetSettings}>.</div>
                    <div className="ButtonDel" onClick={this.deleteWidget}>.</div>
                </div>
                {this.state.onChange === false ? print : change}
            </div>
        )
    }
}

export default JokePrint