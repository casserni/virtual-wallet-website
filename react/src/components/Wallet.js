import React, { Component } from 'react';
import DeleteWallet from './DeleteWallet.js'
import TradeForm from './TradeForm.js'

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amounts:[],
    };
    this.getAmounts = this.getAmounts.bind(this)
    this.sortAmounts = this.sortAmounts.bind(this)
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

  componentDidMount(){
    this.getAmounts()
  }

  render() {
    this.sortAmounts()
    
    let amounts = this.state.amounts.map((amount, index) => {
      return( <li key={index}>{amount.symbol}: {amount.quantity}</li> )
    })
    return (
      <div>
        <p>{this.props.name}</p>
        <ul>
          {amounts}
        </ul>
        <TradeForm
          wallet_id = {this.props.id}
          user_id = {this.props.user_id}
          getAmounts = {this.getAmounts}
          getExchangeRates = {this.props.getExchangeRates}
        />
        <DeleteWallet
          wallet_id = {this.props.id}
          user_id = {this.props.user_id}
          getWallets = {this.props.getWallets}
        />
      </div>
    )
  }
}
export default Wallet
