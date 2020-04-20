import React from 'react';

import './transaction.css';

export class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/transactions')
      .then((res)=>{
        res.json()
          .then((data)=>{
            this.setState({
              transactions: data
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
        <h3>Транзакции</h3>
        <table>
          <thead>
            <tr>
              <th>ID операции</th>
              <th>ID клиента</th>
              <th>Тип операции</th>
              <th>Размер операции</th>
              <th>ИНН отправителя</th>
              <th>ИНН получателя</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody className="scrollableContainer">
            {this.state.transactions.map((transaction, index) => (
              <tr key={transaction.TransactionId}>
                <td>{transaction.TransactionId}</td>
                <td>{transaction.CustomerId}</td>
                <td>{transaction.TransactionType}</td>
                <td>{transaction.Volume}</td>
                <td>{transaction.InnSender}</td>
                <td>{transaction.InnReceiver}</td>
                <td>{transaction.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}