var user = require("../Models/user.js")
var image = require("../Models/image.js")
var relation  = require("../Models/relation.js")
var search_mod = require("../Models/search_mod.js")
var gallery = require("../Models/gallery.js")
var _ = require('underscore');

module.exports.get = function(req, res) {
    console.log("A")
	if (req.session && req.session.user) {
        console.log("B")
        res.render("chat", {
            title: "Hey "+req.session.user.login,
            session: req.session
        })
	}
	else {
        console.log("C")
		res.redirect("/")
	}
}