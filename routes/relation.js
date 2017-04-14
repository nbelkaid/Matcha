var relation = require("../Models/relation.js")

module.exports.button_1 = function(req, res) {
	if (req.session.user.id && req.session.user.id == req.body.id_aut) {
		relation.create_like(req.body.id_aut, req.body.id_rec, function() {
			relation.like_pop(req.body.id_rec, function() {
				res.redirect(req.headers.referer)
			})			
		})
	}
	else {
		res.redirect("/")		
	}
}

module.exports.button_1_bis = function(req, res) {
	if (req.session.user.id && req.session.user.id == req.body.id_aut) {
		relation.unlike(req.body.id_aut, req.body.id_rec, function() {
			relation.unlike_pop(req.body.id_rec, function() {
				res.redirect(req.headers.referer)
			})
		})
	}
	else {
		res.redirect("/")		
	}
}


module.exports.block = function(req, res) {
	if (req.session.user.id && req.session.user.id != req.body.id_rec && req.session.user.id == req.body.id_aut) {
		relation.block(req.body.id_aut, req.body.id_rec, function() {
			relation.block_pop(req.body.id_rec, function() {
				res.redirect("/")
			})
		 })
	}
	else {
		res.redirect("/")
	}
}

module.exports.set_prof = function(req, res) {
	console.log()
	if (req.session.user.login) {
		image.set_profile_picture(req.session.user.login, "/images/"+req.session.user.login+"/photo_"+req.params.nbr, function() {
			res.redirect("/edit_profil/"+req.session.user.login)
		})
	}
	else {
		res.redirect("/")
	}
}
