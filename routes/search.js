var user = require("../Models/user.js")
var image = require("../Models/image.js")
var relation  = require("../Models/relation.js")
var search_mod = require("../Models/search_mod.js")
var _ = require('underscore');

module.exports.post = function(req, res) {
	var str = req.body.search_tag
	var array = str.split(" ")
	console.log("Array : "+array)
	search_mod.get_all_user(function(result){
		var user_res = _.filter(result, function(i) {
			return this.keys.indexOf(i.login) > -1;
			}, {"keys": array})
		console.log("user_res : "+user_res)
		console.log(user_res)
		search_mod.get_all_tag_user(function(result) {
			console.log("Array_bis : "+array)
			var tag_res = _.filter(result, function(i) {
				return this.keys.indexOf(i.name) > -1;
			}, {"keys": array})
			tag_res = _.uniq(tag_res, 'login')
			res.render("search_result", {
	        	title: "Hey "+req.session.user.login,
	        	session: req.session,
	        	gallery: user_res,
	        	gallery_2: tag_res
	      	})
		})
	})
}
