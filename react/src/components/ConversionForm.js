import React, { Component } from 'react';

class ConversionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount:'1',
      base: 1,
      new: 1,
      symbol_base:'USD',
      symbol_new:'USD',
      exchangeRates:[],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target
    let name = target.name
    let value = target.value
    this.setState({[name]: value});

    this.state.exchangeRates.forEach((rate) =>{
      if (rate.rate == value &&  name === 'base') {
        this.setState({symbol_base: rate.symbol})
      } else if (rate.rate == value &&  name === 'new') {
        this.setState({symbol_new: rate.symbol})
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    this.props.getExchangeRates()
      .then(data => {
        data = data.slice(-1)[0].exchange_rates
        this.setState({exchangeRates: data});
      });
  }

  render() {
    debugger
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
          <div className="styled-select blue semi-square">
          <select name='base' value={this.state.base} onChange={this.handleChange}>
            {options}
          </select>
          </div>
          <select name='new' value={this.state.new} onChange={this.handleChange}>
            {options}
          </select>
        </form>
        <p> {this.state.amount} {this.state.symbol_base} = {(this.state.amount * this.state.new/this.state.base).toFixed(3)} {this.state.symbol_new} </p>
      </div>
    );
  }
}

export default ConversionForm
