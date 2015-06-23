var parseSettings = require("../../config/parse");
var Backbone = require("backparse")(parseSettings);

module.exports = Backbone.Model.extend({
	defaults: {
		username:"",
		password:"",
		email:""
	},
	parseClassName: "_User",
	idAttribute: "objectId",
	isUser: true
});