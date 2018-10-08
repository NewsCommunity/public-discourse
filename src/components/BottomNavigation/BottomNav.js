import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
//import QuestionIcon from '@material-ui/icons/Question';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = {
	root: {
		width: 414
	}
};

class BottomNav extends React.Component {
	state = {
		value: 0
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<div>
				<BottomNavigation value={value} onChange={this.handleChange} showLabels className={classes.root}>
					{/* <BottomNavigationAction label="Recents" icon={<RestoreIcon />} /> */}

					<BottomNavigationAction label="Discourse" icon={<RestoreIcon />} data-badge="4" />
					{/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
				</BottomNavigation>
			</div>
			// <div className="bottom-nav">
			// <GeneralEth />
			//   <div>
			//     <span className="mdl-badge" data-badge="4">
			//       Inbox
			//     </span>
			//   </div>
			//   <div>
			//     <div
			//       className="material-icons mdl-badge mdl-badge--overlap"
			//       data-badge="1"
			//     >
			//       account_box
			//     </div>
			//   </div>
			// </div>
		);
	}
}

BottomNav.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomNav);
