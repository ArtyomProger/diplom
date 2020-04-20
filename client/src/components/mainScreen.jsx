import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import './mainScreen.css';

export const MainScreen = () => {
    return (
      <div className="mainScreen_wrapper">
        <div className="mainScreen_text">
          <h2 className="mainScreen_title">
            Система для анализа транзакций на предмет ОД
          </h2>
          <div className="mainScreen_list">
            <div>
              <img src={require("../assets/mainScreen_icon_1.png")} alt="" />
              <p>Автоматический анализ транзакций на предмет ОД/ФТ</p>
            </div>
            <div>
              <img src={require("../assets/mainScreen_icon_2.png")} alt="" />
              <p>Визуализация связей с контрагентами</p>
            </div>
            <div>
              <img src={require("../assets/mainScreen_icon_3.png")} alt="" />
              <p>Планировщик задач</p>
            </div>
            <div className="mainScreen_btn">
              <Link to={routes.auth.path}>Создать систему</Link>
            </div>
          </div>
        </div>
        <div className="mainScreen_img">
          <img src={require('../assets/mainScreen_pc.png')} alt="" />
        </div>
      </div>
    );
};