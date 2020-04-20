import React from 'react';

import './customer.css';

import { SchemaModal } from './schemaModal';

export class Customer extends React.Component {
  constructor() {
    super();

    this.state = {
      customers: [],
      schema: []
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ isModalVisible: false });
  }

  openModal(el) {
    fetch(`http://localhost:8080/connections/${el.target.getAttribute("data-inn")}`)
      .then((res) => {
        res.json()
          .then((data) => {
            this.setState(() => ({
              schema: data,
              isModalVisible: true
            }));
          });
      });
  }

  componentDidMount() {
    fetch('http://localhost:8080/customers')
      .then((res) => {
        res.json()
          .then((data) => {
            this.setState({
              customers: data
            });
          });
      });
  };

  render () {
    return (
      <div style={
        { 
            overflowY: 'scroll', 
            height: 'calc(100% - 220px', 
            marginBottom: '20px' }
        } className="table">
        {this.state.isModalVisible &&
          <SchemaModal schema={this.state.schema}
            closeModal={this.closeModal} />}
            
        <h3>Клиенты</h3>
        <table>
          <thead>
            <tr>
              <th>ID клиента</th>
              <th>Тип счёта</th>
              <th>ИНН</th>
              <th>Ожидаемый рост доходов</th>
              <th>Тип клиента</th>
              <th>Посмотреть схему связей</th>
            </tr>
          </thead>
          <tbody className="scrollableContainer">
            {this.state.customers.map((el, index) => (
              <tr key={el.CustomerId}>
                <td>{el.CustomerId}</td>
                <td>{el.TypeAccount}</td>
                <td>{el.INN}</td>
                <td>{el.ExpectedGrowth}</td>
                <td>{el.CustomerType}</td>
             <td data-inn={el.INN}
                  onClick={(el) => {
                    this.openModal(el);
                  }}>Посмотреть схему связей</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}