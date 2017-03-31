import React, { Component } from 'react';
import LineGraph from './LineGraph.js';

class ConversionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount:'1.00',
      base: 1,
      new: 1,
      symbol_base:'USD',
      symbol_new:'EUR',
      exchangeRates:[],
      historicalRates:[],
      date: ""
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
      if (rate.rate == value &&  name === 'base') {
        this.setState({symbol_base: rate.symbol});
      } else if (rate.rate == value &&  name === 'new') {
        this.setState({symbol_new: rate.symbol});
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    this.props.getExchangeRates()
      .then(data => {
        this.setState({historicalRates: data});
        this.setState({date: data[0].date});
        data = data[0].exchange_rates;
        this.setState({exchangeRates: data});
        data.forEach((currency)=>{
          if (currency.symbol ==="EUR"){
            this.setState({new: currency.rate});
          }
        });
      });
  }

  render() {
    let options = this.state.exchangeRates.map((rate, index) => {
      return( <option key={index} value={rate.rate}>{rate.symbol}</option> );
    });
    return (
      <div>
        <div className='info'>
          <br></br>
          <p className="conversion"> {this.state.amount} {this.state.symbol_base} = {(this.state.amount * this.state.new/this.state.base).toFixed(3)} {this.state.symbol_new} </p>
          <div className='row'>
            <p className='small-6 column cfb'> 1 {this.state.symbol_base} = {(1 * this.state.new/this.state.base).toFixed(3)} {this.state.symbol_new} </p>
            <p className='small-6 column cfn'> 1 {this.state.symbol_new} = {(1 * this.state.base/this.state.new).toFixed(3)} {this.state.symbol_base} </p>
          </div>
          <div className='row'>
            <div className ='small-5 small-centered column'>
              <form onSubmit={this.handleSubmit}>
                <div className='row'>
                  <p className='small-2 column padding words'> Convert:</p>
                  <label className='small-5 column padding'>
                    <input className='textbox smaller' type="text" name='amount' value={this.state.amount} onChange={this.handleChange} />
                  </label>
                  <div className='small-2 column padding'>
                    <select name='base' value={this.state.base} onChange={this.handleChange} className='dropdown cfd smaller'>
                      {options}
                    </select>
                  </div>
                  <p className='small-1 column padding words'> to </p>
                  <div className='small-2 column padding'>
                    <select name='new' value={this.state.new} onChange={this.handleChange} className='dropdown cfd smaller'>
                      {options}
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
          < LineGraph
            data={this.state.historicalRates}
            baseSymbol = {this.state.symbol_base}
            newSymbol = {this.state.symbol_new}
          />
          <p className="updated"> last updated {this.state.date} 11:30 EST </p>
        </div>
      </div>
    );
  }
};

export default ConversionForm
