import {Component } from "react";
import React from "react";
import "../Style/addwidget.css"
import "../Style/board.css"
import create_img from "../front/add - Copy.png"

class AddWidget extends Component {

    render() {
        return (
            <div className="add-widget" onClick={this.props.onClick}>
                <div>
                    <img src={create_img} alt="create page" className="Icon-add"></img>
                </div>

            </div>
        )
    }
}


export default AddWidget;