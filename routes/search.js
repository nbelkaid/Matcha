var user = require("../Models/user.js")
var image = require("../Models/image.js")
var relation  = require("../Models/relation.js")
var search_mod = require("../Models/search_mod.js")
var _ = require('underscore');

module.exports.post = function(req, res) {
	if (req.session.user.id) {
		var str = req.body.search_tag
		var array = str.split(" ")
		console.log("Array : "+array)
		search_mod.get_all_user(function(result){
			var user_res = _.filter(result, function(i) {
				return this.keys.indexOf(i.login) > -1;
			}, {"keys": array})	
			relation.get_all_blocked_user_display(req.session.user.id, function(blocked) {
				var blocked_user = _.pluck(blocked, "login")
				console.log(blocked_user)
				user_res = _.filter(user_res, function(i) {
					return _.indexOf(blocked_user, i.login) == -1
				})
				search_mod.get_all_tag_user(function(result) {
					console.log("Array_bis : "+array)
					var tag_res = _.filter(result, function(i) {
						return this.keys.indexOf(i.name) > -1;
					}, {"keys": array})
					tag_res = _.uniq(tag_res, 'login')
					tag_res = _.filter(tag_res, function(i) {
						return _.indexOf(blocked_user, i.login) == -1
					})
					res.render("search_result", {
			        	title: "Hey "+req.session.user.login,
			        	session: req.session,
			        	gallery: user_res,
			        	gallery_2: tag_res
			      	})
				})
			})
		})
	}
}
