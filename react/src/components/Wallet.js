import React, { Component } from 'react';
import DeleteWallet from './DeleteWallet.js';
import TradeForm from './TradeForm.js';
import AddFunds from './AddFunds.js';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amounts:[],
      transactions:[],
      exchangeRates:[],
    };
    this.getAmounts = this.getAmounts.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.sortAmounts = this.sortAmounts.bind(this);
  }

  sortAmounts() {
    this.state.amounts.sort((a, b) => {
      let symA = a.symbol;
      let symB = b.symbol;
      if (symA < symB) {
        return -1;
      }
      if (symA > symB) {
        return 1;
      }
      return 0;
    });
  }

  getAmounts() {
    fetch(`http://localhost:3000/api/v1/users/${this.props.user_id}/wallets/${this.props.id}.json`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
          let errorMessage = `${response.status} ($response.statusText)`,
            error = new Error(errorMessage);
          throw(error);
        }
    })
      .then(response => response.json())
      .then(body => {
        this.setState({amounts: body.amounts});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getTransactions() {
    fetch(`http://localhost:3000/api/v1/users/${this.props.user_id}/wallets/${this.props.id}.json`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
          let errorMessage = `${response.status} ($response.statusText)`,
            error = new Error(errorMessage);
          throw(error);
        }
    })
      .then(response => response.json())
      .then(body => {
        this.setState({transactions: body.transactions});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount(){
    this.getAmounts();
    this.getTransactions();
    this.props.getExchangeRates()
    .then(data => {
      let today = data[0].exchange_rates;
      this.setState({exchangeRates: today});
    });
  }

  render() {
    this.sortAmounts();
    let base="Base Value Not Existent";
    let baseSymbol= this.props.base;
    let baseRate;
    let value=0;
    let exchangeRates= this.state.exchangeRates;

    exchangeRates.forEach((exchangeRate)=>{
      if(exchangeRate.symbol === baseSymbol){
        baseRate = exchangeRate.rate;
      }
    });

    let amounts = this.state.amounts.map((amount, index) => {
        let output = exchangeRates.map((exchangeRate)=>{
          if(amount.symbol === exchangeRate.symbol){
            value = value + amount.quantity * baseRate/exchangeRate.rate;
            return(
              <tr>
                <td key={index} className="left">{amount.symbol}</td>
                <td className='center'>{amount.quantity.toFixed(3)}</td>
                <td className='center'>{(amount.quantity * baseRate/exchangeRate.rate).toFixed(3)} {baseSymbol}</td>
                <td> </td>
              </tr>
            )
          }
        })
      return (output)
    })

    let transactions = this.state.transactions.map((transaction, index)=>{
      return( <tr><td key={index}>{transaction.body}</td><td className='date'> {transaction.created_at}</td></tr> )
    })

    return (
      <div>
        <div className='info info1'>
          <p></p>
          <h2 className="walletname">{this.props.name}</h2>
          <h2 className='value'> Portfolio Value: {value.toFixed(3)} {this.props.base}</h2>
          <div className='row'>
            <div className='small-11 small-centered column'>
              <table>
                <tr><th className="left">Currency</th><th className='center'>Quantity</th><th className='center'>Value Breakdown</th><th className='right'>% Change </th></tr>
                {amounts}
              </table>
            </div>
            <p></p>
            <div className='small-11 small-centered column'>
              <div className='small-5 column'>
                <TradeForm
                  wallet_id = {this.props.id}
                  user_id = {this.props.user_id}
                  getAmounts = {this.getAmounts}
                  getExchangeRates = {this.props.getExchangeRates}
                  getTransactions = {this.getTransactions}
                />
              </div>
              <div className='small-5 small-offset-2 column'>
                <AddFunds
                  wallet_id = {this.props.id}
                  user_id = {this.props.user_id}
                  base = {this.props.base}
                  getAmounts = {this.getAmounts}
                  getTransactions = {this.getTransactions}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='info'>
          <p></p>
          <h3 className="transaction_title">Transaction History </h3>
          <div className="transaction_list row">
            <div className="small-11 small-centered column">
              <table>
                <tr><th className='description'>Description</th><th>Date</th></tr>
                {transactions}
              </table>
              <div className='right'>
                <DeleteWallet
                wallet_id = {this.props.id}
                user_id = {this.props.user_id}
                getWallets = {this.props.getWallets}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Wallet
