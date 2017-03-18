var user = require("../Models/user.js")

module.exports.get = function(request, response) {
	user.get_user_content(request.params.user, function (profile){
		if (profile <= 0)
			response.redirect('/')
		else {
			console.log('profile = ', profile)
			console.log('session = ', request.session)
			// Add render : 
			//    - photo -> locals.picture[0], locals.picture[1], ..., locals.picture[4]
			response.render('profile_page', {title: profile.login, session: request.session, profile: profile})
		}
	})
}
