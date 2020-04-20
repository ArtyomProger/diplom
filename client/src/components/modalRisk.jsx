import React, { useState, useEffect } from 'react';
import './modalRisk.css';
import { ModalAddParams } from './modalAddParams';
import { WeightCoefModal } from './weightCoefModal';

export const ModalRisk = (props) => {
  const [isModal1Visible, visibleChanger] = useState(false);
  const [isModal2Visible, visibleChanger2] = useState(false);
  const [idOfFactor, idOfFactorChanger] = useState(1);
  const [categoriesData, setCategoriesData] = useState(null);
  const [isLoaded, loadChange] = useState(false);
  const [allCategories, changeAllCategories] = useState({
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
  });

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  async function fetchCategoriesData() {
    await fetch('http://localhost:8080/inherent-factors')
      .then((res) => {
        res.json()
          .then((data) => {
            setCategoriesData(data);
            calculateRiskLevel(data, allCategories);
            loadChange(true);
          })
      });
  }
  
  function calculateRiskLevel(factorsData, factorsMark) {
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
      props.changeRiskLevel("Низкий");
    } else if (score >= 0.75 && score < 2.25) {
      props.changeRiskLevel("Умеренный");
    } else {
      props.changeRiskLevel("Высокий");
    }
  }

  function changeAllCats(data) {
    changeAllCategories(data);
    calculateRiskLevel(categoriesData, allCategories);
  }

  function changeVisible2() {
    visibleChanger2(false);
  }

  if (!isLoaded) {
    return ("Loading...");
  } else {
    return (
      <div className="modalRisk_wrapper">
        <ModalAddParams modalStyle={isModal1Visible} id={idOfFactor} catData={props.catData} changeAllCats={changeAllCats}
          visibleChanger={visibleChanger} allCategories={allCategories} isRiskModal={true}/>
        {isModal2Visible && <WeightCoefModal isRiskModal={true} idOfFactor={idOfFactor} visibleChanger={changeVisible2} />}
        <h3>Оценка присущего риска</h3>
        <div className="modalRisk_row">
          <div
            className="modalRisk_row_el" data-id="1"
            onClick={(el) => {
              idOfFactorChanger(el.target.getAttribute('data-id'));
              calculateRiskLevel(categoriesData, allCategories);
              visibleChanger(true);
            }}
          >
            Клиенты
            </div>
          <div className="modalRisk_row_el" data-id="1"
            onClick={(el) => {
              idOfFactorChanger(el.target.getAttribute('data-id'));
              visibleChanger2(true);
            }}>Весовой коэффициент</div>
        </div>
        <div className="modalRisk_row">
          <div
            className="modalRisk_row_el" data-id="2"
            onClick={(el) => {
              idOfFactorChanger(el.target.getAttribute('data-id'));
              calculateRiskLevel(categoriesData, allCategories);
              visibleChanger(true);
            }}
          >
            Продукты и услуги
            </div>
          <div className="modalRisk_row_el" data-id="2"
            onClick={(el) => {
              idOfFactorChanger(el.target.getAttribute('data-id'));
              visibleChanger2(true);
            }}>Весовой коэффициент</div>
        </div>
        <div className="modalRisk_row">
          <div
            className="modalRisk_row_el" data-id="3"
            onClick={(el) => {
              idOfFactorChanger(el.target.getAttribute('data-id'));
              calculateRiskLevel(categoriesData, allCategories);
              visibleChanger(true);
            }}
          >
            Страны
            </div>
          <div className="modalRisk_row_el" data-id="3"
            onClick={(el) => {
              idOfFactorChanger(el.target.getAttribute('data-id'));
              visibleChanger2(true);
            }}>Весовой коэффициент</div>
        </div>
        <div className="modalRisk_row">
          <div
            className="modalRisk_row_el" data-id="4"
            onClick={(el) => {
              idOfFactorChanger(el.target.getAttribute('data-id'));
              calculateRiskLevel(categoriesData, allCategories);
              visibleChanger(true);
            }}
          >
            Каналы
            </div>
          <div className="modalRisk_row_el" data-id="4"
            onClick={(el) => {
              idOfFactorChanger(el.target.getAttribute('data-id'));
              visibleChanger2(true);
            }}>Весовой коэффициент</div>
        </div>
        <div className="modalRisk_row">
          <div
            className="modalRisk_row_el" data-id="5"
            onClick={(el) => {
              idOfFactorChanger(el.target.getAttribute('data-id'));
              calculateRiskLevel(categoriesData, allCategories);
              visibleChanger(true);
            }}
          >
            Прочее
            </div>
          <div className="modalRisk_row_el" data-id="5"
            onClick={(el) => {
              idOfFactorChanger(el.target.getAttribute('data-id'));
              visibleChanger2(true);
            }}>Весовой коэффициент</div>
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
}