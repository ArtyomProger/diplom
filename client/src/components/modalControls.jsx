import React, { useEffect, useState } from 'react';
import './modalRisk.css';
import { ModalAddParams } from './modalAddParams';
import { WeightCoefModal } from './weightCoefModal';

export const ModalControls = (props) => {
    const [isModal1Visible, visibleChanger] = useState(null);
    const [isModal2Visible, visibleChanger2] = useState(false);
    const [idOfFactor, idOfFactorChanger] = useState(null);
    const [categoriesData, setCategoriesData] = useState(null);
    const [allCategories, changeAllCategories] = useState({
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
    });

    const factorsList = ['"Знай своего клиента"', "Мониторинг и контроль",
        "Принципы и процедуры", "Иные оценки рисков", "Корпоративное управление в сфере ПОД",
        "Управленческая информация и отчетность", "Хранение данных", "Соблюдение законодательства о ПОД",
        "Выявление подозрительных операций", "Обучение", "Независимое тестирование",
        "Иные инструменты контроля"];

    useEffect(() => {
        fetchCategoriesData();
    }, []);

    async function fetchCategoriesData() {
        await fetch('http://localhost:8080/efficiency-factors')
            .then((res) => {
                res.json()
                    .then((data) => {
                        setCategoriesData(data);
                        calculateEfficiencylevel(data, allCategories);
                    })
            });
    }

    function changeAllCats(data) {
        changeAllCategories(data);
        calculateEfficiencylevel(categoriesData, allCategories);
    }

    function calculateEfficiencylevel(factorsData, factorsMark) {
        let score = 0;


        for (let i in factorsData) {
            for (let j in factorsMark) {
                if (factorsData[i]["Factor_Inh_Id"] === j) {
                    score += Number(factorsData[i]["FactorWeight"]) * Number(factorsMark[j]);
                }
            }
        }

        score = score.toFixed(3);

        if (score < 0.75) {
            props.changeEfficiencylevel("Низкий");
        } else if (score >= 0.75 && score < 2.25) {
            props.changeEfficiencylevel("Умеренный");
        } else {
            props.changeEfficiencylevel("Высокий");
        }
    }

    return (
        <div className="modalControls_wrapper">
            {isModal1Visible && <ModalAddParams modalStyle={isModal1Visible} id={idOfFactor} isRiskModal={false}
                catData={props.catData} changeAllCats={changeAllCats}
                visibleChanger={visibleChanger} allCategories={allCategories} />}
            {isModal2Visible && <WeightCoefModal isRiskModal={false} idOfFactor={idOfFactor} visibleChanger={visibleChanger2} />}
            <h3>Оценка эффективности инструментов контроля</h3>
            <div style={
                { 
                    overflowY: 'scroll', 
                    height: 'calc(100% - 220px', 
                    marginBottom: '20px' }
                }>
                {factorsList.map((el, i) => 
                    <div className="modalRisk_row" key={++i}>
                        <div className="modalRisk_row_el" data-id={i}
                        onClick={(el)=>{
                            idOfFactorChanger(el.target.getAttribute('data-id'));
                            visibleChanger(true);
                }}>{el}</div>
                        <div className="modalRisk_row_el" data-id={i}
                        onClick={(el)=>{
                            idOfFactorChanger(el.target.getAttribute('data-id'));
                            visibleChanger2(true);
                        }}>Весовой коэффициент</div>
                    </div>
                )}
            </div>
            <div className="modalRisk_btn_wrapper">
                <div
                    className="modalRisk_btn"
                    onClick={() => {
                        props.closeModal();
                    }}
                >
                    Назад
                </div>
            </div>
        </div>
    );
}