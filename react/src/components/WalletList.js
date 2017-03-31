import React, { Component } from 'react';
import Wallet from './Wallet.js';
import NewWalletForm from './NewWalletForm.js';

class WalletList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallets: [],
      currentWallet: 0,
      user_id: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.getWallets = this.getWallets.bind(this);
  }

  handleClick(event) {
  this.setState({currentWallet: Number(event.target.id)});
  }

  getWallets(){
    this.props.getWallets()
    .then(data => {
      this.setState({wallets: data});
      if(data.length > 0){
        this.setState({currentWallet: data[data.length-1].id});
      } else {
        this.setState({currentWallet: 0});
      }
    });
  }

  componentWillMount(){
    this.setState({user_id: document.getElementById('current_user').innerHTML});
  }
  componentDidMount() {
    this.getWallets();
  }

  render() {
    let selectedState=this.state.currentWallet;
    let walletList = this.state.wallets.map((wallet, index) => {
      let className = 'wallet';
      if(wallet.id == selectedState){
        className = 'wallet selected';
      }

      return(<li className={className} key={index} id={wallet.id} onClick={this.handleClick}>{wallet.name}</li> )
    })

    let className='wallet'
    if(0 == selectedState){
      className = 'wallet selected'
    }
    walletList.push(<li className={className} key={-1} id={0} onClick={this.handleClick}>Add Portfolio</li>)

    let selectedWallet;
    if (this.state.currentWallet === 0){
      selectedWallet = <NewWalletForm getExchangeRates={this.props.getExchangeRates} getWallets={this.getWallets}/>
    } else {
      selectedWallet = this.state.wallets.map((wallet, index)=>{
        if (this.state.currentWallet === wallet.id) {
          return(
            <Wallet
              key = {index}
              id = {wallet.id}
              user_id = {this.state.user_id}
              name = {wallet.name}
              base = {wallet.base}
              amounts = {wallet.amounts}
              getWallets = {this.getWallets}
              getExchangeRates = {this.props.getExchangeRates}
            />
          );
        }
      });
    }

    return (
      <div>
        <ul className='wlist'>
          {walletList}
        </ul>
        {selectedWallet}
      </div>
    );
  }
}
export default WalletList
