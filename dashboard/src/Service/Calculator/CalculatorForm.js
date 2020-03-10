import React from "react";
import '../Weather/WeatherForm.css';
import addWidget from "../CreateWidget";
import addWidgetToUser from "../AddWidgetToUser";

class CalculatorForm extends React.Component {

    addWidgetCalculator = async (e) => {
        e.preventDefault();
        let data = new Object();
        data.type = 'CALCULATOR';
        data.settings = 'empty'
        let tmp = await addWidget(data);
        console.log("Widget ID:")
        console.log(tmp.id)
        await addWidgetToUser(tmp);
        console.log(data);
    }

    render() {
        return (
            <div className="FormStyle">
                <label className="LabelStyle">EZ no settings</label>
                <div className="buttonEx" onClick={this.addWidgetCalculator}>Create Calculator</div>
            </div>
        )
    }
}

export default CalculatorForm;