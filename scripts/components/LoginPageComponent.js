var React = require('react');
var _ = require("underscore");

var loginModel = require("../models/UserModel");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			errors: {}
		}
	},
	render: function() {
		return (
			<div>
				<form onSubmit={this.loginUser}>
					<input ref="username" type="text" placeholder="username" />
					<p>{this.state.errors.username}</p>
					<input ref="password" type="password" placeholder="password" />
					<p>{this.state.errors.password}</p>
					<button>Login</button>
					<p>{this.state.errors.incorrect}</p>
				</form>
				<button onClick={this.goToRegister}>Register</button>
			</div>
		);
	},
	goToRegister: function(e) {
		e.preventDefault();
		this.props.myRouter.navigate("register", {trigger:true});
	},
	loginUser: function(e) {
		var that = this;
		e.preventDefault();

		var err = {};

		var loggedIn = new loginModel();
		var user = (this.refs.username.getDOMNode().value).toLowerCase();
		var pw = this.refs.password.getDOMNode().value
		
		if(!user) {
			err.username = "Username cannot be left blank"
		}
		if(!pw) {
			err.password = "Password cannot be left blank"
		}

		this.setState({errors:err});

		if(_.isEmpty(err)) {
			loggedIn.login({
				username: user,
				password: pw
			},{
				success: function(userModel) {
	        	console.log('user was logged in');
	        	that.props.myRouter.navigate("home", {trigger:true});
	    	},
	    		error: function(userModel, response) {
	    		console.log(response.responseJSON)
				if(response.responseJSON.code === 101) {
					err.incorrect = response.responseJSON.error;
				}

	        	that.setState({errors:err});
	   		}

			});
		}
	}
});