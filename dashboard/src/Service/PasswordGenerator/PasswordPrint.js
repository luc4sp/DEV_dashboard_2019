import React from 'react';
import UpdateWidgetSettings from "../UpdateWidget";
import {client} from "../../App";
import {ME_PROFILE} from "../../Db/User/Query/Me";
import './PasswordGenerator.css'
import '../Weather/Weather.css'
import disconnectWidget from "../DeleteWidget";

class PasswordPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: undefined,
            complexity: undefined,
            password: undefined,
            id: undefined,
            onChange: false
        };
    }

    componentDidMount = async () => {
        const res = await client.query({query: ME_PROFILE});
        var settings = this.props.settings.split('/');
        this.setState({id: this.props.id});
        this.setState({length: settings[0]});
        var comp = "alpha";
        if (settings[1] === "Alpha") {
            this.setState({complexity: "alpha"});
            comp = "alpha"
        }
        if (settings[1] === "Alpha, Num") {
            this.setState({complexity: "alphaNumeric"});
            comp = "alphaNumeric"
        }
        if (settings[1] === "Alpha, Num & Special") {
            this.setState({complexity: "alphaNumSpecial"});
            comp = "alphaNumSpecial"
        }
        var respCall = await fetch(`https://cors-anywhere.herokuapp.com/` + `https://www.sethcardoza.com/api/rest/tools/random_password_generator/type:json/length:${settings[0]}/complexity:${comp}`, {mode: 'cors'})
        var resp = await respCall.json();
        this.setState({password: resp.password})
    };

    changeWidgetSettings = (e) => {
        e.preventDefault();
        let tmp = true;
        if (this.state.onChange === true)
            tmp = false;
        this.setState({onChange: tmp})
    };

    handleChangeSelect = (e) => {
        e.preventDefault();
        this.setState({complexity: e.target.value});
    };

    getListComplexity() {
        const currency = ["Alpha", "Alpha, Num", "Alpha, Num & Special"];
        const listItems = currency.map((currency) =>
            <option value={currency.toString()} key={currency.toString()}>{currency}</option>
        );
        return (
            listItems
        );
    }

    handleClick = async (e) => {
        e.preventDefault();
        let settings = this.state.length;
        let comp = this.state.complexity;
        var respCall = await fetch(`https://cors-anywhere.herokuapp.com/` + `https://www.sethcardoza.com/api/rest/tools/random_password_generator/type:json/length:${settings}/complexity:${comp}`, {mode: 'cors'})
        var resp = await respCall.json();
        this.setState({password: resp.password})
    };

    handleChangeLength = (e) => {
        e.preventDefault();
        this.setState({length: e.target.value})
    };

    updatePasswordGenerator = async () => {
        let data = {};
        if (this.state.length < 4)
            return;
        data.id = this.state.id;
        data.settings = this.state.length;
        data.settings += "/" + this.state.complexity;
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
            <div className="Text">
                <h3 >{this.state.password}</h3>
                <div className="ButtonNew" onClick={this.handleClick}>New Password</div>
            </div>;
            let change = 
            <div className="EditPassword">
                <div className="Length" >
                    <h4>Password lenght :</h4>
                    <input type="number" value={this.state.length} onChange={this.handleChangeLength} min="4" max="32"/>
                </div>
                <h4 className="Complexity" >Password Complexity :
                    <select className="SelectPassword" value={this.state.complexity} onChange={this.handleChangeSelect}>
                        {this.getListComplexity()}
                    </select>
                </h4>
                <div className="EditPasswordButton" onClick={this.updatePasswordGenerator}>Update Widget</div>
            </div>;
            return (
            <div className='Password'>
                <div className="Content">
                    <div className="TopButtons">
                        <div className="Button2" onClick={this.changeWidgetSettings}>.</div>
                        <div className="ButtonDel" onClick={this.deleteWidget}>.</div>
                    </div>
                    {this.state.onChange === false ? print : change}
                </div>
            </div>
        )
    }
}

export default PasswordPrint