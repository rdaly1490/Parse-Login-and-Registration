var React = require('react');
var _ = require("underscore");
var RegUser = require("../models/UserModel");
var validator = require("validator");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			errors: {}
		}
	},
	render: function() {
		return (
			<form onSubmit={this.registerUser}>
				<input type="text" ref="username" placeholder="username" />
				<p>{this.state.errors.username}</p>
				<input type="text" ref="password" placeholder="password" />
				<p>{this.state.errors.password}</p>
				<input type="text" ref="email" placeholder="email" />
				<p>{this.state.errors.email}</p>
				<button>Register</button>
			</form>
		);
	},
	registerUser: function(e) {
		var that = this;
		e.preventDefault();
		var newUser = new RegUser({
			username: (this.refs.username.getDOMNode().value).toLowerCase(),
			password: this.refs.password.getDOMNode().value,
			email: this.refs.email.getDOMNode().value
		});

		var err = {};

		if(!newUser.get("username")) {
          	err.username = "Username cannot be left blank";
        } 
        else if (!validator.isAlphanumeric(newUser.get("username"))) {
        	err.username = "Username must be alpha-numeric";
        }
        if(!newUser.get("password")) {
			err.password = "Password cannot be left blank";
        } 
        else if (!((newUser.get("password")).length >= 6)) {
        	err.password = "Password must be at least 6 characters";
        }
        if(!newUser.get("email")) {
            err.email = "Email cannot be left blank";
        } 
        else if(!validator.isEmail(newUser.get("email"))) {
        	err.email = "Email must contain @ symbol and be valid";
        }

        this.setState({errors: err});

        if(_.isEmpty(err)) {
		console.log(newUser);
		newUser.save(null,
				{
					success: function(userModel) {
	       				that.props.myRouter.navigate("home", {trigger:true});
	       			},
					error: function(userModel, response) {
	        			if(response.responseJSON.code === 202) {
	        				err.username = response.responseJSON.error;
	        			}
	        			else if(response.responseJSON.code === 203) {
	        				err.email = response.responseJSON.error;
	        			}

	        			that.setState({errors:err});
	        		}
				}
			);
		}
	}
});