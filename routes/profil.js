var user = require("../Models/user.js")
var image = require("../Models/image.js")
var relation  = require("../Models/relation.js")
var notification = require("../Models/notification.js")

module.exports.get = function(request, response) {
	console.log('param-user1 =', request.params.user)
	var user_prof = request.params.user
	user.get_user_content(request.params.user, function (profile){
		if (profile <= 0 || !request.session.user)
			response.redirect('/')
		else {
			relation.block_exist_display(profile.id, request.session.user.id, (result) => {
				if (result) {
					response.redirect("/")
				}
				else {
					if (request.session.user.login != request.params.user) {
						relation.visit_pop(request.params.user, function() {
							console.log("lolilol")
						})
						notification.create_notif(profile.id, request.session.user.id, 1, function(result) {
							request.io.to(profile.id).emit('visit', {message: request.session.user.login + " a visité votre profil !",
								id_not: result});
						})
					}
					console.log('profile = ')
					console.log(profile)
					image.get_image_by_user(user_prof, function(image) {
						console.log("----- IMAGE PROFIL -----")
						console.log(image)
						relation.button_1(request.session.user.id, profile.id, function(button) {
							console.log("button = "+button)
							response.render('profile_page', {title: profile.login,
							session: request.session,
							profile: profile,
							button_1: button,
							picture: image})
						})
					})
				}
			})
		}
	})
}
