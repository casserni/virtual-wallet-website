import React, { Component } from 'react';

class DeleteWallet extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`https://ctrader.herokuapp.com/api/v1/users/${this.props.user_id}/wallets/${this.props.wallet_id}.json`,
      {
        method: "delete",
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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Delete Portfolio" className='click'/>
        </form>
        <p></p>
      </div>
    );
  }
};

export default DeleteWallet
