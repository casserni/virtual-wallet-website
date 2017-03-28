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
    fetch(`https://ctrader.herokuapp.com/api/v1/users/${this.props.user_id}/wallets/${this.props.id}.json`)
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
    fetch(`https://ctrader.herokuapp.com/api/v1/users/${this.props.user_id}/wallets/${this.props.id}.json`)
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
  }

  render() {
    this.sortAmounts();

    let amounts = this.state.amounts.map((amount, index) => {
      return( <li key={index}>{amount.symbol}: {amount.quantity}</li> )
    })

    let transactions = this.state.transactions.map((transaction, index)=>{
      return( <li key={index}>{transaction.body}</li> )
    })

    return (
      <div>
        <p>{this.props.name}</p>
        <ul>
          {amounts}
        </ul>
        <AddFunds
          wallet_id = {this.props.id}
          user_id = {this.props.user_id}
          base = {this.props.base}
          getAmounts = {this.getAmounts}
          getTransactions = {this.getTransactions}
        />
        <TradeForm
          wallet_id = {this.props.id}
          user_id = {this.props.user_id}
          getAmounts = {this.getAmounts}
          getExchangeRates = {this.props.getExchangeRates}
          getTransactions = {this.getTransactions}
        />
        <DeleteWallet
          wallet_id = {this.props.id}
          user_id = {this.props.user_id}
          getWallets = {this.props.getWallets}
        />
        <ul>
          {transactions}
        </ul>
      </div>
    )
  }
}
export default Wallet
