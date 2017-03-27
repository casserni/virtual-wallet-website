import React, { Component } from 'react';
class ConversionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      yesterdayValue: 1,
      exchangeRates:[],
      yesterdayRates:[],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let yesterdayValue;
    this.state.exchangeRates.forEach((rate) => {
      if(rate.rate == event.target.value) {
        this.state.yesterdayRates.forEach((yesterdayRate)=> {
          if(rate.symbol === yesterdayRate.symbol){
            yesterdayValue = yesterdayRate.rate;
          }
        });
      }
    });

    this.setState({value: event.target.value});
    this.setState({yesterdayValue: yesterdayValue.toString()});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    this.props.getExchangeRates()
    .then(data => {
      let today = data[0].exchange_rates;
      let yesterday = data[1].exchange_rates;

      this.setState({exchangeRates: today});
      this.setState({yesterdayRates: yesterday});
    });
  }

  render() {
    let rates=[];
    let todayValue = this.state.value;
    let yesterdayValue = this.state.yesterdayValue;
    let yesterdayRates = this.state.yesterdayRates;

    let options = this.state.exchangeRates.map((rate, index) => {
      let yesterdayRate = null;

      yesterdayRates.forEach((yesterday)=> {
        if(yesterday.symbol === rate.symbol){
          yesterdayRate = yesterday.rate/yesterdayValue;
        }
      });

      let todayRate = rate.rate/todayValue;

      if(rate.rate != todayValue) {
        let pn;
        let sign;
        if(todayRate - yesterdayRate > 0){
          pn = "p"
          sign = "+"
        } else{
          pn = "n"
        }
        rates.push(<tr><td key={index}>{rate.symbol}</td><td className="rate">{(todayRate).toFixed(3)}</td><td className={`percent ${pn}`}>{sign}{((todayRate - yesterdayRate)/yesterdayRate * 100).toFixed(3)}%</td></tr>);
        }
        return( <option key={index} value={rate.rate}>{rate.symbol}</option> );
    });

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <div className='row'>
          <div className='small-8 small-centered column'>
          <select value={this.state.value} onChange={this.handleChange}>
            {options}
          </select>
          </div>
        </div>
      </form>
      <table>
        {rates}
      </table>
      </div>
    );
  }
};
export default ConversionTable
