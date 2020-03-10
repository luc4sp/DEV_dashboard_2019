import React from 'react';
import '../Weather/Weather.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calcul: '',
        };
    }

    insert = (e) => {
        e.preventDefault();
        let calcul = this.state.calcul + e.target.value;
        this.setState({calcul});
    };

    back = () => {
        let calcul = this.state.calcul;
        calcul = calcul.substring(0, calcul.length - 1)
        this.setState({calcul});
    };

    clear = () => {
        let calcul = this.state.calcul;
        calcul = '';
        this.setState({calcul});
    };

    equal = () => {
        let calcul = this.state.calcul;
        try {
            calcul = eval(calcul).toString();
        } catch (e){
            calcul = ''
        }
            this.setState({calcul});
    };

    render() {
        return (
            <div className='Back-widget'>
                <div className="main">
                    <div>
                        <input value={this.state.calcul} readOnly/>
                    </div>
                    <div>
                        <input className="button" type="button" value="C" onClick={this.clear}/>
                        <input className="button" type="button" value="<" onClick={this.back} />
                        <input className="button" type="button" value="/" onClick={this.insert}/>
                        <input className="button" type="button" value="*" onClick={this.insert}/>
                    </div>
                    <div>
                        <input className="button" type="button" value="7" onClick={this.insert}/>
                        <input className="button" type="button" value="8" onClick={this.insert}/>
                        <input className="button" type="button" value="9" onClick={this.insert}/>
                        <input className="button" type="button" value="-" onClick={this.insert}/>
                    </div>
                    <div>
                        <input className="button" type="button" value="4" onClick={this.insert}/>
                        <input className="button" type="button" value="5" onClick={this.insert}/>
                        <input className="button" type="button" value="6" onClick={this.insert}/>
                        <input className="button" type="button" value="+" onClick={this.insert}/>
                    </div>
                    <div>
                        <input className="button" type="button" value="1" onClick={this.insert}/>
                        <input className="button" type="button" value="2" onClick={this.insert}/>
                        <input className="button" type="button" value="3" onClick={this.insert}/>
                        <input className="button" type="button" value="=" onClick={this.equal}/>
                    </div>
                    <input className="button" type="button" value="0" onClick={this.insert}/>
                    <input className="button" type="button" value="." onClick={this.insert}/>
                    <input className="button" type="button" value="%" onClick={this.insert}/>
                </div>
            </div>
        )
    }
}

export default Calculator