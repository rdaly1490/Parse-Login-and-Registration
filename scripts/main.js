var React = require('react');
var parseSettings = require("../config/parse");
var Backbone = require("backparse")(parseSettings)

var LoginPageComponent = require("./components/LoginPageComponent");
var RegisterPageComponent = require("./components/RegisterPageComponent");

var App = Backbone.Router.extend({
	routes: {
		"": "login",
		"login":"login",
		"register":"register",
		"home": "home"
	},
	login: function() {
		React.render(
			<div>
				<h1>Login Page</h1>
				<LoginPageComponent myRouter={myRouter} />
			</div>,
			document.getElementById("container"));
	},
	register: function() {
		React.render(
			<div>
				<h1>Register Page</h1>
				<RegisterPageComponent myRouter={myRouter} />
			</div>,
			document.getElementById("container"));
	},
	home: function() {
		React.render(
			<div>
				<h1>Home Page</h1>
				<div> "Rob, you're the man"</div>
			</div>,
			document.getElementById("container"));
	}

});

var myRouter = new App();
Backbone.history.start();