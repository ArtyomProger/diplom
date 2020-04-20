import React from 'react';

export const MainBlock = (props) => {
    if (!props) {
        return 'Loading...';
    }

    return (
        <div className="customization_wrapper">
            <h3>Выберите этап оценки риска отмывания денег</h3>
            <div className="customization_el customization_el_headers"
                onClick={() => {
                    // props.setRiskVisible(true);
                }}>
                <p>Оценка присущего риска</p>
            </div>
            <div className="customization_el customization_el_headers"
                onClick={() => {
                    // props.setControlsVisible(true);
                }}>
                <p>Оценка эффективности инструментов контроля</p>
            </div>
            <div className="customization_el customization_el_headers"
                onClick={() => {
                    // props.setResidualRiskVisible(true);
                }}>
                <p>Оценка остаточного риска</p>
            </div>
            <div className="customization_el">
                <p>Среднее значение уровня присущего риска</p>
                <h4>Низкий</h4>
            </div>
            <div className="customization_el">
                <p>Текущий показатель эффективности системы</p>
                <h4>95%</h4>
            </div>
            <div className="customization_el">
                <p>Текущий уровень остаточного риска</p>
                <h4>Низкий</h4>
            </div>
        </div>
    );
}