import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import './leftNavbar.css';

export const LeftNavbar = () => {
    return (
        <div className="leftNavbar_wrapper">
            <div className="leftNavbar_list">
                <Link to={routes.tasks.path}>
                    <div className="leftNavbar_img">
                        <img src={require("../assets/navbar_icon_2.png")} alt="" />
                    </div>
                    <p>
                        Задачи и проекты
                    </p>
                </Link>
                <Link to={routes.customers.path}>
                    <div className="leftNavbar_img">
                        <img src={require("../assets/navbar_icon_3.png")} alt="" />
                    </div>
                    <p>
                        Клиенты
                    </p>
                </Link>
                <Link to={routes.transactions.path}>
                    <div className="leftNavbar_img">
                        <img src={require("../assets/navbar_icon_4.png")} alt="" />
                    </div>
                    <p>
                        Транзакции
                    </p>
                </Link>
                <Link to={routes.connections.path}>
                    <div className="leftNavbar_img">
                        <img src={require("../assets/navbar_icon_5.png")} alt="" />
                    </div>
                    <p>
                        Оценка рисков транзакций
                    </p>
                </Link>
                <Link to={routes.metodology.path}>
                    <div className="leftNavbar_img">
                        <img src={require("../assets/navbar_icon_6.png")} alt="" />
                    </div>
                    <p>
                        Настройка методологии
                    </p>
                </Link>
            </div>
        </div>
    );
}