import React, { Component } from 'react';
import { firestore } from '../../fire';
import Login from '../authentication/login';
import BottomNav from '../BottomNavigation/BottomNav';
import { thunkSetEthProdiver, thunkSetNewAccount } from "../../state/user/reducer";
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import ConfirmModal from '../ethereum/ConfirmModal';
import AccountMenu from '../ethereum/AccountMenu';
import Web3 from 'web3';
import Eth from 'ethjs';
import {etherscan} from '../../secrets';
import axios from 'axios';



const web3= new Web3();



class BlockChainBucket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tipAmount: "0",
			currentAccount: '0x0',
      tipOver: false,
			accounts: [],
      destination: '0x0',
      modalOpen: false,
      ethPrice: 0
		};
  }


  handleOpen = () => {
    this.setState(() => {return { modalOpen: true }});
  };

  handleClose = () => {
    this.setState(() => {return { modalOpen: false }});
  };

  onIncrement = () => {
    let tip = new Eth.BN(this.state.tipAmount);
    let increment = new Eth.BN("100000000000000000");
    tip = tip.add(increment);
    let balance = new Eth.BN(this.state.currentBalance);
    console.log(tip.toString());
    if (tip.gt(balance)){
      this.setState(() => {return {tipOver: true}})
    } else {
    this.setState(() => {return {tipAmount: tip.toString(10, 4)}})
    }

  }

  onDecrement = () => {
    let tip = new Eth.BN(this.state.tipAmount);
    let decrement = new Eth.BN("100000000000000000");
    tip = tip.sub(decrement);
    let balance = new Eth.BN(this.state.currentBalance);
    console.log(tip.toString());
    const zero = new Eth.BN(0);

    if (tip.lt(balance)){
      this.setState(()=> {return {tipOver: false}})
    }

    if(tip.isNeg()){
    this.setState(() => {return {tipAmount: zero}})
    } else {
    this.setState(() => {return {tipAmount: tip}})
    }

  }

  toEther =(bigNumber, decimalPlaces=2) =>{
    let value = Eth.fromWei(bigNumber, 'ether');

    return value.slice(0, value.indexOf(".")+decimalPlaces+1);
   }

  convertToEth = (wei) => {

    return web3.version.toString;
  }

  ethPriceInUSD = () => {
    let tip = new Eth.BN(this.state.tipAmount);
    let price = new Eth.BN(this.state.ethPrice);
    let ethUSD = tip.mul(price);
    return ethUSD.toString();
  }



	async componentDidMount() {

    this.props.setEthProvider();

    console.log("The State of User: ", this.props);
    console.log("The state of dispatch", this.props.setEthProvider);

    console.log("HELLO!")
    axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${etherscan}`)
      .then(res => {
        const rate = res.data.result.ethusd;
        console.log("Eth Rate: ", rate);
        this.setState(() => {return {ethPrice: rate}});
      })
  }

	render() {
		const { tipAmount, currentAccount, currentBalance, accounts, destination } = this.state;
		const { logOutUser, logInUser, isLoggedIn, displayName } = this.props;
		return (

			<div className="BlockChain-Bar">
				<div className={this.state.tipOver ? "BlockChain-Bar-Eth-Balance tip-over": "BlockChain-Bar-Eth-Balance"}>{Eth.fromWei(this.props.currentBalance, 'ether')} ETH</div>

				<div className="BlockChain-Center">
					<div>
						<button className="mdl-button mdl-js-button mdl-button--icon">
							<i className="material-icons" onClick={() => this.onDecrement()}>expand_more</i>
						</button>
					</div>
					<span className="mdl-chip mdl-chip--deletable" onClick={() => {this.handleOpen}}>
						<span className="mdl-chip__text chip-bar" >{Eth.fromWei(this.state.tipAmount, 'ether')} ETH / {Eth.fromWei(this.ethPriceInUSD(), 'ether')} USD </span>
						<button type="button" className="mdl-chip__action" >
							<i className="material-icons icon-fire" >whatshot</i>
						</button>
					</span>
					<div>
						<button className="mdl-button mdl-js-button mdl-button--icon">
							<i className="material-icons" onClick={() => this.onIncrement()}>expand_less</i>
						</button>
					</div>
				</div>

				<div className="BlockChain-Bar-Account-Availible">
  <AccountMenu accounts={this.props.availibleAccounts}/>
				</div>


        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <div>
            MODAL IS HERE!
          </div>
        </Modal>

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
    ethProvider: state.userReducer.ethProvider

	};
}

function mapDispatch(dispatch) {
	return {
    setEthProvider: () => {
      dispatch(thunkSetEthProdiver());
    },
    setNewAccount: (account) => {
      dispatch(thunkSetNewAccount(account));
    }
		// logOutUser: () => {
		// 	dispatch(thunkLogOutUser());
		// },
		// logInUser: () => {
		// 	dispatch(thunkLogInUser());
		// }
	};
}

BlockChainBucket = connect(mapState, mapDispatch)(BlockChainBucket);

export default BlockChainBucket;
