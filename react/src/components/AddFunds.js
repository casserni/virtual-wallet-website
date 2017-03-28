import React, { Component } from 'react';

class AddFunds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount:'1',
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

    fetch(`https://ctrader.herokuapp.com/api/v1/users/${this.props.user_id}/wallets/${this.props.wallet_id}.json`,
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
        <form onSubmit={this.handleSubmit}>
          <label>
            Amount:
            <input type="text" name='amount' value={this.state.amount} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Add Funds" />
        </form>
      </div>
    );
  }
}

export default AddFunds
