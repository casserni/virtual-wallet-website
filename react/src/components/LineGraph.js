import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';


class LineGraph extends Component {
  constructor(props){
    super(props)
    }

  render() {
    let days =[];
    let rates = [];
    let newSymbol = this.props.newSymbol;
    let baseSymbol = this.props.baseSymbol;
    this.props.data.forEach((data)=>{
      let exchangeRate;
      let newRate;
      let baseRate;
      let rate;
      days.push(new Date(data.date).toDateString());
      
      data.exchange_rates.forEach((rate)=>{
        if(rate.symbol === baseSymbol){
          baseRate = rate.rate;
        }
        if(rate.symbol === newSymbol){
          newRate = rate.rate;
        }
      })
      rate = (newRate / baseRate).toFixed(4);
      rates.push(rate);
    });
    const data = {
      labels: days.reverse(),

      options: {
        scales:{
          xAxes:[{
            gridLines:{
              color:"rgba(255,255,255)",
              zeroLineColor:"rgba(255,255,255)"
            }
          }],
          yAxes:[{
            display:false
          }],
        }
      },

      datasets: [
        {
          label: 'My First dataset',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'square',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'mitter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: rates.reverse()
        }
      ]
    };

    return (
      <div>
        <h2>Line Example</h2>
        <Line data={data} />
      </div>
    );
  }
};

export default LineGraph
