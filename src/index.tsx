import React from 'react';
import ReactDOM from 'react-dom';

import { createServer, Model } from "miragejs";

import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },
  
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          type: 'deposit',
          title: 'Freelance',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date("2022-02-15 19:00:00"),
        },
        {
          id: 2,
          type: 'withdraw',
          title: 'Aluguel',
          category: 'Moradia',
          amount: 1200,
          createdAt: new Date("2022-02-11 09:00:00"),
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);