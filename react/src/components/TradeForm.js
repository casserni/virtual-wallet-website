import React, { Component } from 'react';

class TradeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount:'1',
      base_rate: 1,
      new_rate: 1,
      symbol_base:'USD',
      symbol_new:'USD',
      exchangeRates:[],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({[name]: value});

    this.state.exchangeRates.forEach((rate) =>{
      if (rate.rate == value &&  name === 'base_rate') {
        this.setState({symbol_base: rate.symbol});
      } else if (rate.rate == value &&  name === 'new_rate') {
        this.setState({symbol_new: rate.symbol});
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = JSON.stringify({
      trade:{
        amount: this.state.amount,
        base_rate: this.state.base_rate,
        new_rate: this.state.new_rate,
        symbol_base: this.state.symbol_base,
        symbol_new: this.state.symbol_new,
      }
    });

    fetch(`http://localhost:3000/api/v1/users/${this.props.user_id}/wallets/${this.props.wallet_id}.json`,
      {
        method: "PATCH",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: data
      }
    )
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} ($response.statusText)`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response=>{
      this.props.getAmounts();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let base_amount;
    let new_amount;
    if (this.state.base_amount !== prevState.base_amount) {
      new_amount = (this.state.base_amount * this.state.new_rate/this.state.base_rate).toFixed(4);
      this.setState({new_amount: new_amount.toString()});
    } else if (this.state.new_amount !== prevState.new_amount) {
        base_amount = (this.state.new_amount * this.state.base_rate/this.state.new_rate).toFixed(4);
        this.setState({base_amount: base_amount.toString()});
      }
  }

  componentDidMount() {
    this.props.getExchangeRates()
      .then(data => {
        data = data[0].exchange_rates;
        this.setState({exchangeRates: data});
      });
  }

  render() {
    let options = this.state.exchangeRates.map((rate, index) => {
      return( <option key={index} value={rate.rate}>{rate.symbol}</option> )
    })
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Amount:
            <input type="text" name='amount' value={this.state.amount} onChange={this.handleChange} />
          </label>
          <select name='base_rate' value={this.state.base_rate} onChange={this.handleChange}>
            {options}
          </select>
          <select name='new_rate' value={this.state.new_rate} onChange={this.handleChange}>
            {options}
          </select>
          <input type="submit" value="Trade" />
        </form>
      </div>
    );
  }
}

export default TradeForm
