var user = require("../Models/user.js")
var image = require("../Models/image.js")

module.exports.get = function(request, response) {
	console.log('param-user1 =', request.params.user)
	var user_prof = request.params.user
	user.get_user_content(request.params.user, function (profile){
		if (profile <= 0)
			response.redirect('/')
		else {
			console.log('profile = ', profile)
			console.log('session = ', request.session)
			console.log('param-user2 =', user_prof)
			// Add render : 
			//    - photo -> locals.picture[0], locals.picture[1], ..., locals.picture[4]
			image.get_image_by_user(user_prof, function(image) {
				response.render('profile_page', {title: profile.login, session: request.session, profile: profile, picture: image})
			})
		}
	})
}
