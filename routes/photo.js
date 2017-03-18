var image = require("../Models/image.js")

module.exports.delete = function(req, res) {
	console.log("LIIIIIIIIIL")
	if (req.session.user.login) {
		image.delete_picture(req.session.user.login, "/images/"+req.session.user.login+"/photo_"+req.params.nbr, function() {
			console.log("LOOOOOOOOOL")
			res.redirect("/edit_profil/"+req.session.user.login)
		} )
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
