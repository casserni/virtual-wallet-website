import React, { Component } from 'react';

class NewWalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0,
      name: 'New Portfolio',
      base: 'USD',
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
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = JSON.stringify({
      wallet:{
        name: this.state.name,
        user_id: this.state.user_id,
        base: this.state.base
      }
    });

    fetch(`http://localhost:3000/api/v1/users/${this.state.user_id}/wallets.json`,
      {
        method: "post",
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
      this.props.getWallets();
    });
  }

  componentDidMount() {
    this.setState({user_id: document.getElementById('current_user').innerHTML});
    this.props.getExchangeRates()
      .then(data => {
        data = data[0].exchange_rates;
        this.setState({exchangeRates: data});
      });
  }

  render() {
    let options = this.state.exchangeRates.map((rate, index) => {
      return( <option key={index} value={rate.symbol}>{rate.symbol}</option> )
    })

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Wallet Name:
          <input type="text" name='name' value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Base currency:
          <select name="base" value={this.state.value} onChange={this.handleChange} className='dropdown'>
            {options}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NewWalletForm
