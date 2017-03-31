import React, { Component } from 'react';

class AddFunds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount:'1.00',
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
      add_funds:{
        amount: this.state.amount,
        base: this.props.base
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
      this.props.getTransactions();
    });
  }

  render() {
    return (
      <div>
      <h3 className='exchangetitle'>Deposit</h3>
        <form onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='small-8 column padding'>
              <input className='textbox smaller' type="text" name='amount' value={this.state.amount} onChange={this.handleChange} />
            </div>
            <p className='small-1 column padding words'> {this.props.base}</p>
            <div className="small-3 column padding">
              <input type="submit" value="Add Funds" className='smaller1 click'/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddFunds
