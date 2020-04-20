import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';
import { routes } from '../routes';

const name = 'Иванов Д.С.';
const position = 'Руководитель отдела ПОД/ФТ';
const companyName = 'ПАО "Банк"';

export class Header extends React.Component {
    render () {
        return (
            <div className="header_wrapper">
                <div className="header">
                    <Link to={routes.tasks.path}>
                    <div className="header_companyName">
                        <p>
                            {companyName}
                        </p>
                    </div>
                    </Link>
                    <div className="header_name">
                        <p>
                            {name}
                            <br />
                            {position}
                        </p>
                        <img src={require("../assets/avatar.png")} alt=""/>
                    </div>
                </div>
            </div>
        );
    };
};