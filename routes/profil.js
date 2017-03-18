var user = require("../Models/user.js")

module.exports.get = function(request, response) {
	user.get_user_content(request.params.user, function (profile){
		if (profile <= 0)
			response.redirect('/')
		else {
			console.log('profile = ', profile)
			response.render('profile_page', {title: profile.login, session: request.session, profile: profile})
		}
	})
}
