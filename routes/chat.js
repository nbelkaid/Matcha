var user = require("../Models/user.js")
var image = require("../Models/image.js")
var relation  = require("../Models/relation.js")
var search_mod = require("../Models/search_mod.js")
var gallery = require("../Models/gallery.js")
var _ = require('underscore');

module.exports.get = function(req, res) {
    if (req.session.user == null) res.redirect('/')

    relation.get_all_match(req.session.user.id, function(result) {
        console.log(req.session.user.id)

        if (result) {
            res.render('chat', {
                title       : "Matcha",
                session     : req.session,
                contact     : result
            })
        }
    })
}