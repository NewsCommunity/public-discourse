import React, { Component } from 'react';
import { firestore } from '../../fire';
import Login from '../authentication/login';
import BottomNav from '../BottomNavigation/BottomNav';
//import { thunkLogInUser, thunkLogOutUser } from "../../state/user/reducer";
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import ConfirmModal from '../ethereum/ConfirmModal';
import AccountMenu from '../ethereum/AccountMenu';
import Web3 from 'web3';

const web3= new Web3();
var firebase = require('firebase');


class BlockChainBucket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tipAmount: 0,
			currentAccount: '0x0',
      currentBalance: 20000,
      tipOver: false,
			accounts: [],
      destination: '0x0',
      modalOpen: false,
		};
	}

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  onIncrement = () => {
    let tip = this.state.tipAmount + 10000
    if (tip >= this.state.currentBalance){
      this.setState(() => {return {tipOver: true}})
    }
    this.setState(() => {return {tipAmount: tip}})

  }

  onDecrement = () => {
    let tip = this.state.tipAmount - 10000
    if (tip < this.state.currentBalance){
      this.setState(()=> {return {tipOver: false}})
    }
    if(tip < 0){
    this.setState(() => {return {tipAmount: 0}})
    } else {
    this.setState(() => {return {tipAmount: tip}})
    }

  }

  convertToEth = (wei) => {

    return web3.version.toString;
  }

	async componentDidMount() {}

	render() {
		const { tipAmount, currentAccount, currentBalance, accounts, destination } = this.state;
		const { logOutUser, logInUser, isLoggedIn, displayName } = this.props;
		return (

			<div className="BlockChain-Bar">
				<div className={this.state.tipOver ? "BlockChain-Bar-Eth-Balance tip-over": "BlockChain-Bar-Eth-Balance"}>{this.state.currentBalance}:ETH</div>

				<div className="BlockChain-Center">
					<div>
						<button className="mdl-button mdl-js-button mdl-button--icon">
							<i className="material-icons" onClick={() => this.onDecrement()}>expand_more</i>
						</button>
					</div>
					<span className="mdl-chip mdl-chip--deletable">
						<span className="mdl-chip__text chip-bar" >{this.state.tipAmount}</span>
						<button type="button" className="mdl-chip__action">

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
  <AccountMenu />
				</div>


        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <ConfirmModalWrapped />
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
		isLoggedIn: state.userReducer.isLoggedIn
	};
}

function mapDispatch(dispatch) {
	return {
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
