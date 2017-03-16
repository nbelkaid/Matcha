module.exports.get = function(request, response) {

	if (request.session)
		request.session = null
	response.redirect('/')

}
