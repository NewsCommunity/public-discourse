import React, { Component } from 'react';
import {
  thunkSetEthProdiver,
  thunkSetNewAccount,
  actionSetTipDestination,
} from '../../state/user/reducer';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import TipRecipient from '../Ethereum/TipRecipient';
import AccountMenu from '../Ethereum/AccountMenu';
import Web3 from 'web3';
import Eth from 'ethjs';
import { etherscan } from '../../secrets';
import axios from 'axios';

const web3 = new Web3();

const demoWeb3 = new Web3(web3.currentProvider);



class BlockChainBucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipAmount: '0',
      currentAccount: '0x0',
      tipOver: false,
      accounts: [],
      destination: '0x0',
      modalOpen: false,
      ethPrice: 0,
      tipRecipient: { displayName: '', id: '', ethAddress: '' },
    };
  }

  handleOpen = () => {
    this.setState(() => {
      return { modalOpen: true };
    });
  };

  handleClose = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  //NEEDS TO BE DISPATCH
  clearTip = () => {
    
    this.props.clearTipDestination();
    this.setState(() => {
      return { tipRecipient: { displayName: '', id: '', ethAddress: '' } };
    });
  };

  setTipDestination = () => {};

  onIncrement = () => {
    let tip = new Eth.BN(this.state.tipAmount);
    let increment = new Eth.BN('10000000000000000');
    tip = tip.add(increment);
    let balance = new Eth.BN(this.props.currentBalance);
    
    if (tip.gt(balance)) {
      this.setState(() => {
        return { tipOver: true };
      });
    } else {
      this.setState(() => {
        return { tipAmount: tip.toString(10, 4) };
      });
    }
  };

  onDecrement = () => {
    let tip = new Eth.BN(this.state.tipAmount);
    let decrement = new Eth.BN('10000000000000000');
    tip = tip.sub(decrement);
    let balance = new Eth.BN(this.props.currentBalance);
    
    const zero = new Eth.BN(0);

    if (tip.lt(balance)) {
      this.setState(() => {
        return { tipOver: false };
      });
    }

    if (tip.isNeg()) {
      this.setState(() => {
        return { tipAmount: zero };
      });
    } else {
      this.setState(() => {
        return { tipAmount: tip };
      });
    }
  };

  toEther = (bigNumber, decimalPlaces = 2) => {
    let value = Eth.fromWei(bigNumber, 'ether');

    return value.slice(0, value.indexOf('.') + decimalPlaces + 1);
  };

  convertToEth = wei => {
    return web3.version.toString;
  };

  ethTipInUSD = () => {
    //Javascript Type Coercion here
    let tip = new Eth.BN(this.state.tipAmount);
    let price = new Eth.BN(this.state.ethPrice);
    price = price.toString();
    tip = tip.toString();
    price = price / 1000;
    tip = tip * price;
    tip = Eth.fromWei(tip, 'ether').toString();
    tip = parseFloat(tip);
    return tip.toFixed(2);
  };

  async componentDidMount() {
    this.props.setEthProvider();

    
    
    axios
      .get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${etherscan}`)
      .then(res => {
        const rate = res.data.result.ethusd;
        
        this.setState(() => {
          return { ethPrice: rate };
        });
      });
  }

  render() {
    const { tipAmount, currentAccount, currentBalance, accounts, destination } = this.state;
    const { logOutUser, logInUser, isLoggedIn, displayName, tipDestination, ethProvider } = this.props;
    //
    return (
      <div className="BlockChain-Bar">
      
        <div
          className={
            this.state.tipOver
              ? 'BlockChain-Bar-Eth-Balance tip-over'
              : 'BlockChain-Bar-Eth-Balance'
          }
        >
          {parseFloat(Eth.fromWei(this.props.currentBalance, 'ether')).toFixed(2)} ETH
        </div>

        <div className="BlockChain-Center">

          {!ethProvider ? (<div>No Web</div>):(<div className="BlockChain-Center-inner">
              <div>
                <button className="mdl-button mdl-js-button mdl-button--icon">
                  <i className="material-icons" onClick={() => this.onDecrement()}>
                    expand_more
                  </i>
                </button>
              </div>
              <span
                className="mdl-chip mdl-chip--deletable"
                onClick={() => {
                  this.handleOpen;
                }}
              >
                <span className="mdl-chip__text chip-bar">
                  {Eth.fromWei(this.state.tipAmount, 'ether')} ETH / {this.ethTipInUSD()} USD{' '}
                </span>
                <button type="button" className="mdl-chip__action">
                  <i
                    className="material-icons icon-fire"
                    onClick={() => {
                      this.clearTip();
                    }}
                  >
                    cancel
                  </i>
                </button>
              </span>
              <div>
                <button className="mdl-button mdl-js-button mdl-button--icon">
                  <i
                    className="material-icons"
                    onClick={() => {
                      this.onIncrement();
                    }}
                  >
                    expand_less
                  </i>
                </button>
              </div>
          </div>)}
          {tipDestination.user ? (
            <div>
              <TipRecipient
                displayName={tipDestination.user}
                photo={tipDestination.photo}
                ethAddress={tipDestination.uid}
              />
            </div>
          ) : (
            <div />
          )}
        </div>

        <div className="BlockChain-Bar-Account-Availible">
          <AccountMenu accounts={this.props.availibleAccounts} />
        </div>
      </div>
    );
  }
}

//CONTAINER====================================================================
function mapState(state) {
  return {
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn,
    fullUserState: state.userReducer,
    currentBalance: state.userReducer.currentEthBalance,
    currentAccount: state.userReducer.currentEthAccount,
    availibleAccounts: state.userReducer.ethAccounts,
    isFetchingEth: state.userReducer.isFetchingEth,
    ethProvider: state.userReducer.ethProvider,
    tipDestination: state.userReducer.tipDestination,
    isTipActive: state.userReducer.isTipActive,
  };
}

function mapDispatch(dispatch) {
  return {
    setEthProvider: () => {
      dispatch(thunkSetEthProdiver());
    },
    setNewAccount: account => {
      dispatch(thunkSetNewAccount(account));
    },
    clearTipDestination: () => {
      dispatch(actionSetTipDestination({}));
    },
    setTipDestination: destination => {
      dispatch(actionSetTipDestination(destination));
    },
  };
}

BlockChainBucket = connect(
  mapState,
  mapDispatch,
)(BlockChainBucket);

export default BlockChainBucket;
