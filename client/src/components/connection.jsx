import React from 'react';

import './connection.css';

import { SchemaModal } from './schemaModal';

export class Connection extends React.Component {
  constructor() {
    super();
    this.state = {
      connections: [],
    };
  }
  
  async getData() {
    await fetch('http://localhost:8080/transactions-id')
      .then((res) => {
        res.json()
          .then((data) => {
            console.log(data);
          });
      });
    await fetch('http://localhost:8080/connections')
      .then((res) => {
        res.json()
          .then((data) => {
            this.setState({
              connections: data
            });
          });
      });
    }

  componentDidMount() {
    this.getData();
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
        closeModal={this.closeModal}/>}
        <h3>Оценка транзакций</h3>
        <table>
          <thead>
            <tr>
              <th>ID риска операции</th>
              <th>ID операции</th>
              <th>Уровень присущего риска</th>
              <th>Эффективность инструментов контроля</th>
              <th>Уровень остаточного риска</th>
            </tr>
          </thead>
          <tbody>
            {this.state.connections.map((el, index) => (
              <tr key={el.TransactionRiskId}>
                <td>{el.TransactionRiskId}</td>
                <td>{el.TransactionId}</td>
                <td>{el.InherentLevel}</td>
                <td>{el.EfficiencyLevel}</td>
                <td>{el.MLRISK}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}