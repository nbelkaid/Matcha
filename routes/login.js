var user = require("../Models/user.js")
var geo = require("../Models/geo.js")

module.exports.post = function(req, res) {
	console.log(req.body);
	console.log(req.session)
	req.session.login = 'huhu'
	console.log(req.session)
	user.connect(req.body, req.session, function (result) {
		console.log(result)
		if (result == -1) {
			res.render("", {session: req.session, title: "Bienvenue", message: "Une erreur est survenue"})
		}
		// else if (result == 1) {
		// 	bcrypt.compare(req.body.p, hash, function (err, res) {
		// 		if (res == false) {
		// 			res.render("", {title: "Oups", message: "Nom d'utilisateur ou mot de passe incorrect"})	
		// 		}
		// 		else if (res == true) {
		// 			req.session.user = 
		// 			res.render("", {title: "Oups", message: "Nom d'utilisateur ou mot de passe incorrect"})
		// 		}
		// 	})
		// }
		else if (result == 0) {
			res.render("", {session: req.session, title: "Oups", message: "Nom d'utilisateur ou mot de passe incorrect"})
		}
		else if (result == 1) {
			geo.get_location(function(location) {
				console.log("LOCATION ---> "+location.loc)
				req.session.user.location = location.loc
				res.redirect("/");
			})
		}
	})
}