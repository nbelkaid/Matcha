var user = require("../Models/user.js")

module.exports.get = function(req, res) {
	console.log("inscription");
	res.render("create_form", {title: 'Create account', error: 'erreur'});
}

module.exports.post = function(req, res) {
	console.log(req.body)
	user.create(req.body, function (result) {
		console.log("Callback parameter")
		console.log(result)
		if (result == -1) {
			res.render("", {title: "Bienvenue", message: "Une erreur est survenue", session: req.session})
		}
		else if (result == 0) {
			res.render("", {title: "Bienvenue", message: "Inscription réussie, vous pouvez vous connecter", session: req.session})
		}
		else if (result == 1) {
			res.render("Display_message", {title: "login deja utilisé"})
		}
		else if (result == 2) {
			res.render("Display_message", {title: "adresse mail deja utilisé"})
		}
		else if (result == 3) {
			res.render("Display_message", {title: "numero de telephone deja utilisé"})
		}
	})
}