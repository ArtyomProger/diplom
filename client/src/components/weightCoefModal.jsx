import React from 'react';
import './weightCoefModal.css';

export class WeightCoefModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formValue: ''
        }

        this.saveHandler = this.saveHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    saveHandler(e) {
        e.preventDefault();
        if (this.state.formValue === '') {
            return
        }

        let url = '';

        if (this.props.isRiskModal) {
            url = 'inherent-factors';
        } else {
            url = 'efficiency-factors';
        }

        fetch(`http://localhost:8080/${url}/${this.props.idOfFactor}`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: this.state.formValue
            })
        })
        .then((res)=>{
            console.log(res.body);
        });

        this.props.visibleChanger(false);
    }
    
    handleChange(event) {
        this.setState({ formValue: event.target.value });
    }

    render() {
        return (
            <div className="weightCoefModal_wrapper">
                <form onSubmit={(e) => { this.saveHandler(e) }} className="weightCoefModal_content">
                    <div className="weightCoefModal_close"
                    onClick={()=>{
                        this.props.visibleChanger(false);
                    }}>
                        <img src={require('../assets/plus_cross.png')} alt=""/>
                    </div>
                    <div className="weightCoefModal_input">
                        <label htmlFor="weightCoefModal_input">
                            <p>
                                Укажите значение весового коэффициента, в процентах
                            </p>
                        </label>
                        <input id="weightCoefModal_input" type="text"
                            value={this.state.formValue} onChange={this.handleChange}/>
                    </div>
                    <button className="weightCoefModal_btn">Сохранить</button>
                </form>
            </div>
        );
    }
}