import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ConversionForm from './components/ConversionForm.js'
import ConversionTable from './components/ConversionTable.js'
import WalletList from './components/WalletList.js'

let getExchangeRates = () => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/api/v1/days.json')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} ($response.statusText)`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => {
        resolve(response.json());
      })
      .catch(error => reject(Error(`Error in fetch: ${error.message}`)));
    })
}

let getWallets = () => {
  let user_id = document.getElementById('current_user').innerHTML
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/api/v1/users/${user_id}/wallets.json`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} ($response.statusText)`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      resolve(response.json());
    })
    .catch(error => reject(Error(`Error in fetch: ${error.message}`)));
  })
}

$(function() {
  ReactDOM.render( < ConversionForm getExchangeRates={getExchangeRates}/>, document.getElementById('ConversionForm'));
  ReactDOM.render( < ConversionTable getExchangeRates={getExchangeRates}/>, document.getElementById('ConversionTable'));
  ReactDOM.render( < WalletList getExchangeRates={getExchangeRates} getWallets={getWallets}/> , document.getElementById('WalletList'));
});
