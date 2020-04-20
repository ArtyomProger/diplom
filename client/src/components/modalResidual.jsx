import React from 'react';
import './modalResidual.css';

export const ModalResidual = (props) => {
    return (
        <div className="modalResidual_wrapper">
            <div className="modalResidual_row">
                <div className="modalResidual_el">
                    <p>Текущий уровень остаточного риска</p>
                    <h4>Низкий</h4>
                </div>
            </div>
            <div className="modalResidual_row">
                <div className="modalResidual_el">
                    <p>Стратегические действия</p>
                </div>
                <div className="modalResidual_el">
                    <p>Тактические действия</p>
                </div>
                <div className="modalResidual_el">
                    <p>Риск-аппетит</p>
                </div>
            </div>
            <div className="modalRisk_btn"
                onClick={() => {
                    props.closeModal();
                }}>
                Назад
            </div>
        </div>
    );
}