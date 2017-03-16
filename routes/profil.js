var user = require("../Models/user.js")

module.exports.get = function(request, response) {
	console.log(request.params)
	user.get_user_content(request.params.user, function (result){
		if (result <= 0)
			response.redirect('/')
		else {
			console.log(result)
			response.render('profile_page', {title: result.login, session: request.session})
		}
	})
}
