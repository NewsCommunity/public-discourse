import React from 'react';
import firebase from 'firebase';

var provider = new firebase.auth.GoogleAuthProvider();

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      displayName: '',
      email: ''
		};
	}

	componentDidMount() {

	}

	signin = () => {
		firebase.auth().signInWithRedirect(provider);

		firebase
			.auth()
			.getRedirectResult()
			.then(function(result) {
				if (result.credential) {
					// This gives you a Google Access Token. You can use it to access the Google API.
					var token = result.credential.accessToken;
					console.log('This is the Token: ', token);
					// ...
				}
				// The signed-in user info.
				var user = result.user;

			})
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
			});
	};
	render() {
		return (
			<div className="chat-box">
				<div onClick={() => this.signin()}>SignIn</div>
			</div>
		);
	}
}

export default Login;
