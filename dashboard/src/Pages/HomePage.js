import {Component } from "react";
import React from "react";
import TopBar from '../Components/topBar'
import AddWidget from "../Components/addWidget"
import CreateWidgetPage from './CreateWidgetPage'
import { client } from "../App";
import { ME_PROFILE } from "../Db/User/Query/Me";
import '../Style/homepage.css'
import '../Style/board.css'
import PasswordPrint from "../Service/PasswordGenerator/PasswordPrint";
import WeatherPrint from "../Service/Weather/WeatherPrint";
import ExchangerPrint from "../Service/Exchanger/ExchangerPrint";
import CryptoExchangerPrint from "../Service/CryptoExchanger/CryptoExchangerPrint";
import RandomThingPrint from "../Service/RandomThings/RandomThingPrint";
import JokePrint from '../Service/Joker/JokePrint';
    
class HomePage extends Component {

    constructor(props) {
        super(props);
        this.handleclick = this.handleclick.bind(this);
        this.handleQuit = this.handleQuit.bind(this);
        this.state = {
            create: false,
            user: undefined,
            Widget: undefined,
            WidgetSet: undefined
        };
    }
    
    handleclick() {
        this.setState({
            create: true
        });
    }

    componentDidMount = async () => {
    const res = await client.query({query: ME_PROFILE});
    this.setState({
        user: res.data.me,
        Widget: res.data.me.widgets,
    })
    };

    handleQuit() {
        this.setState({
            create: false
        });    
    }

    getWidget(elem, i){
        switch (this.state.Widget[i].type) {
            case undefined:
                return <div>loading</div>
            case "WEATHER":
                return <WeatherPrint settings={this.state.Widget[i].settings} id={this.state.Widget[i].id}/>
            case "EXCHANGER":
                return <ExchangerPrint settings={this.state.Widget[i].settings} id={this.state.Widget[i].id}/>
            case "PASSWORD":
                return <PasswordPrint settings={this.state.Widget[i].settings} id={this.state.Widget[i].id}/>
            case "CRYPTOEXCHANGER":
                return <CryptoExchangerPrint settings={this.state.Widget[i].settings} id={this.state.Widget[i].id}/>
            case "RANDOMTHING":
                return <RandomThingPrint settings={this.state.Widget[i].settings} id={this.state.Widget[i].id}/>
            case "JOKE":
                return <JokePrint settings={this.state.Widget[i].settings} id={this.state.Widget[i].id}/>
        }
    }

    render() {
        const { create } = this.state;

        let comp;
        if (create) {
            comp = <CreateWidgetPage handleQuit={this.handleQuit}/>
        } else {
            comp = <AddWidget onClick={this.handleclick}/>

        }
        let wid
        if (this.state.Widget != undefined) {
            if (!create) {
                wid = this.state.Widget.map((elem,i) => {return this.getWidget(elem, i)})
            }
        }
        return (
            <div className="allContainer">
                <div>
                    <TopBar/>
                </div>
                <div className={(create) ? "Board-center" : "Board"}>
                    {comp}
                    {wid}
                </div>
            </div>
        )
    }
}

export default HomePage;