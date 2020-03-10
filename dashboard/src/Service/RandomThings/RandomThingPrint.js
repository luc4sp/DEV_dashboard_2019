import React from 'react';
import UpdateWidgetSettings from "../UpdateWidget";
import './RandomThing.css';
import disconnectWidget from "../DeleteWidget";
import '../Weather/Weather.css'

class RandomThingPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            theme: undefined,
            thing: undefined,
            onChange: false,
        };
    }

    componentDidMount = async () => {
        this.setState({
            id: this.props.id,
            theme: this.props.settings,
        })
        let rep = await fetch(`http://numbersapi.com/random/${this.props.settings}`);
        let resp = await rep.text();
        this.setState({thing: resp});
    };

    changeWidgetSettings = (e) => {
        e.preventDefault();
        let tmp = true;
        if (this.state.onChange === true)
            tmp = false;
        this.setState({onChange: tmp})
    };

    getListType() {
        const type = ["trivia", "year", "date", "math"];
        const listItems = type.map((type) =>
            <option value={type.toString()} key={type.toString()}>{type}</option>
        );
        return (
            listItems
        );
    }

    update = async () => {
        let rep = await fetch(`http://numbersapi.com/random/${this.state.theme}`);
        let resp = await rep.text();
        this.setState({thing: resp});
    };

    updateWidget = async () => {
        let data = {};
        data.id = this.state.id;
        data.settings = this.state.theme;
        await UpdateWidgetSettings(data);
        this.update();
        this.setState({onChange: false});
    };

    handleChange = (e) => {
        e.preventDefault();
        this.setState({theme: e.target.value});
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
                <h4 className="fontwhite">{this.state.thing}</h4>
            </div>;

        let change =
            <div>
                <select value={this.state.theme} onChange={this.handleChange}>
                    {this.getListType()}
                </select>
                <div>
                    <div className="Button1" onClick={this.updateWidget}>Update Random</div>
                </div>
            </div>;

        return (
            <div className='Back-widgetRandom'>
                <div className="TopButtons">
                    <div className="Button2" onClick={this.changeWidgetSettings}>.</div>
                    <div className="ButtonDel" onClick={this.deleteWidget}>.</div>
                </div>
                {this.state.onChange === false ? print : change}
            </div>
        )
    }
}

export default RandomThingPrint;