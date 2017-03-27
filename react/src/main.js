import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ConversionForm from './components/ConversionForm.js';
import ConversionTable from './components/ConversionTable.js';
import WalletList from './components/WalletList.js';
import { getExchangeRates, getWallets } from './data.js';

$(function() {
  ReactDOM.render( < ConversionForm getExchangeRates={getExchangeRates}/>, document.getElementById('ConversionForm'));
  ReactDOM.render( < ConversionTable getExchangeRates={getExchangeRates}/>, document.getElementById('ConversionTable'));
  ReactDOM.render( < WalletList getExchangeRates={getExchangeRates} getWallets={getWallets}/> , document.getElementById('WalletList'));
});
