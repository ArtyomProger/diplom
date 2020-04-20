import React, { useState } from 'react';
import './customization.css';

import { ModalRisk } from './modalRisk';
import { ModalControls } from './modalControls';
import { ModalResidual } from './modalResidual';

export const Customization = () => {
    const [isRiskVisible, setRiskVisible] = useState(false);
    const [isControlsVisible, setControlsVisible] = useState(false);
    const [isResidualRiskVisible, setResidualRiskVisible] = useState(false);
    const [riskLevel, newRiskLevel] = useState("Низкий");
    const [efficiencylevel, newEfficiencylevel] = useState("Низкий");

    const closeRiskModal = () => {
        setRiskVisible(false);
    };

    const closeControlsModal = () => {
        setControlsVisible(false);
    };

    const closeResidualModal = () => {
        setResidualRiskVisible(false);
    };

    const changeRiskLevel = (value) => {
        newRiskLevel(value);
    }

    const changeEfficiencylevel = (value) => {
        newEfficiencylevel(value);
    }

    const MainBlock = () => {
        return(
            <div className="customization_wrapper">
                <h3>Выберите этап оценки риска отмывания денег</h3>
                <div className="customization_el customization_el_headers"
                    onClick={() => {
                        setRiskVisible(true);
                    }}>
                    <p>Оценка присущего риска</p>
                </div>
                <div className="customization_el customization_el_headers"
                    onClick={() => {
                        setControlsVisible(true);
                    }}>
                    <p>Оценка эффективности инструментов контроля</p>
                </div>
                <div className="customization_el customization_el_headers"
                    onClick={() => {
                        setResidualRiskVisible(true);
                    }}>
                    <p>Оценка остаточного риска</p>
                </div>
                <div className="customization_el">
                    <p>Среднее значение уровня присущего риска</p>
                    <h4>{riskLevel}</h4>
                </div>
                <div className="customization_el">
                    <p>Текущий показатель эффективности системы</p>
                    <h4>{efficiencylevel}</h4>
                </div>
                <div className="customization_el">
                    <p>Текущий уровень остаточного риска</p>
                    <h4>Низкий</h4>
                </div>
            </div>
        );
    }

    return (
        <>
            {isRiskVisible && <ModalRisk 
                changeRiskLevel={changeRiskLevel} closeModal={closeRiskModal} />}
            {isControlsVisible && <ModalControls 
                changeEfficiencylevel={changeEfficiencylevel} closeModal={closeControlsModal} />}
            {isResidualRiskVisible && <ModalResidual closeModal={closeResidualModal} />}
            {!isRiskVisible && !isControlsVisible && !isResidualRiskVisible && <MainBlock />}
        </>
    );
}