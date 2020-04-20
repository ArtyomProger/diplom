import React from 'react';
import './addCoefModal.css';

export const AddCoefModal = (props) => {
    return (
        <div className="weightCoefModal_wrapper">
            <div className="weightCoefModal_content">
                <div className="weightCoefModal_close"
                    onClick={() => {
                        props.changeFactorVisible(false);
                    }}>
                    <img src={require('../assets/plus_cross.png')} alt="" />
                </div>
                <div className="weightCoefModal_input">
                    <label htmlFor="weightCoefModal_input">
                        <p>
                            Напишите название фактора
                        </p>
                    </label>
                    <input id="weightCoefModal_input" type="text" />
                </div>
                <div className="weightCoefModal_input">
                    <label htmlFor="weightCoefModal_input">
                        <p>
                            Выберите варианты оценки риска
                        </p>
                    </label>
                    <select id="weightCoefModal_select" >
                        <option value="">Высокий</option>
                        <option value="">Умеренный</option>
                        <option value="">Низкий</option>
                    </select>
                </div>
                <button className="weightCoefModal_btn">Добавить фактор</button>
            </div>
        </div>
    );
}