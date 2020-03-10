import {Component} from "react";
import React from "react";
import image from "../front/Default_photo .jpg"
import "../Style/profil.css"
import '../Style/board.css'
import TopBar from '../Components/topBar'
import {client} from "../App";
import {ME_PROFILE} from "../Db/User/Query/Me";
import WeatherPrint from "../Service/Weather/WeatherPrint";
import ExchangerPrint from "../Service/Exchanger/ExchangerPrint";
import CryptoExchangerPrint from "../Service/CryptoExchanger/CryptoExchangerPrint";
import Calculator from "../Service/Calculator/Calculator";
import PasswordPrint from "../Service/PasswordGenerator/PasswordPrint";
import RandomThingPrint from "../Service/RandomThings/RandomThingPrint";

class ProfilPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: undefined,
            lastName: undefined,
            email: undefined,
        };
    }

    componentDidMount = async () => {
        const res = await client.query({query: ME_PROFILE});
        this.setState({
            firstName: res.data.me.firstName,
            lastName: res.data.me.lastName,
            email: res.data.me.email
        })
    }

    render() {
        return (
            <div className="Container">
                <div>
                    <TopBar/>
                </div>
                <div className="Board-profil">
                    <div className="Image-container">
                        <img className="Image" src={image} alt="profil"/>
                    </div>
                    <h1>{this.state.firstName} {this.state.lastName}</h1>
                    <h2>email: {this.state.email}</h2>
                    <p>Brasseur de milions d'euros depuis 1998</p>
                </div>
            </div>
        )
    }
}

export default ProfilPage;