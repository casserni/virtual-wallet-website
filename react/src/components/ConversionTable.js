import React, { Component } from 'react';
class ConversionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      exchangeRates:[],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
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
    let rates=[]
    let options = this.state.exchangeRates.map((rate, index) => {
      rates.push(<li key={index}>{rate.symbol}: {(rate.rate/this.state.value).toFixed(3)}</li>)
      return( <option key={index} value={rate.rate}>{rate.symbol}</option> )
    })
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.value} onChange={this.handleChange}>
          {options}
        </select>
      </form>
      <ul>
        {rates}
      </ul>
      </div>
    );
  }
}
export default ConversionTable
