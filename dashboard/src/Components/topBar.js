import React, { Component } from 'react';
import "../Style/topbar.css"
import compteur from "../front/compteur - Copy.png";
import profil from "../front/profilBlue.png"
import logout from "../front/logout.png"

class TopBar extends Component {

  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    console.log("logout")
    localStorage.clear()
  };

    render() {
      return (
        <div className="topnav">
          <br/>
          <a href="/ProfilPage">
            <img src={profil} alt="profil" className="Icon"></img>
          </a>
          <br/>
          <a href="/HomePage">
            <img src={compteur} alt="home page" className="Icon"></img>
          </a>
          <br />
          <a href="/" onClick={this.handleLogout}>
            <img src={logout} alt="logout" className="IconLogout"></img>
          </a>
        </div>
      );
    }
  }

export default TopBar   