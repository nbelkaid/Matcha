var user = require("../Models/user.js")
var image = require("../Models/image.js")
var _ = require('underscore')
var tag = require("../Models/tag.js")

module.exports.get = function(req, res) {
	if (typeof(req.session.user) == "undefined") {
		res.redirect("/")
	}
	if (req.params.user != req.session.user.login) {
		res.redirect("/");
	}
	else {
		console.log("session :")
		_.each(req.session.user, function(key, value) {
			console.log(key+" : "+value)
		})
		console.log("Fin")
		image.get_image_by_user(req.session.user.login, function(result) {
			if (result === -1) {
				res.redirect("/")
			}
			else {
				var photo = result;
				var tmp = _.findWhere(photo, {is_profil: 1})
				var prof_nbr;
				if (!tmp) {
					prof_nbr = 0
				}
				else {
					prof_nbr = tmp.path.slice(-1)
				}
				tag.get_tag_user(req.session.user.login, function(result){
					console.log("result_tag = "+result)
					res.render('edit', {
						title: req.params.user,
						session: req.session,
						photos: photo,
						prof_nbr: prof_nbr,
						tag: result})
				})
			}
		})
	}
}

module.exports.post = function(req, res) {
	console.log("Post: "+req.body)
	console.log(_.each(req.body, function(value, key) {
		console.log("key: "+key+", value :"+value)
	}))
	if (req.params.user != req.session.user.login) {
		res.redirect("/");
	}
	// else if (req.body.type == 0) {
	// 	//Edition photos
	// 	var fs = require('fs')
	// 	var dir = './public/images/'+req.params.user
	// 	if (!fs.existsSync(dir)){
 //    		fs.mkdirSync(dir)
	// 	}
	// 	if (!req.files) {
	// 	}
	// 	else {
	// 		var photo = image.get_image_by_user(req.session.user.login, function(result) {
	// 			if (result === -1) {
	// 				res.redirect("/")
	// 			}
	// 			else {
	// 				var i = 0;
	// 				console.log("req.files"+req.files)
	// 			}
	// 		})
	// 	}
	// }

	else if (req.body.type == 0) {
		//Changement photo
		var fs = require('fs')
		var dir = './public/images/'+req.params.user
		var i = 0
		if (!fs.existsSync(dir)){
    		fs.mkdirSync(dir)
		}
		if ('photo_1' in req.files) {
			let Upload_file = req.files.photo_1;
			Upload_file.mv('./public/images/'+req.params.user+'/photo_1.jpg', function(err) {
			})
			image.create_image(req.session, 1)
		}
		if ('photo_2' in req.files) {
			let Upload_file_2 = req.files.photo_2;
			Upload_file_2.mv('./public/images/'+req.params.user+'/photo_2.jpg', function(err) {
			})
			image.create_image(req.session, 2)			
		}
		if ('photo_3' in req.files) {
			let Upload_file_3 = req.files.photo_3;
			Upload_file_3.mv('./public/images/'+req.params.user+'/photo_3.jpg', function(err) {
			})
			image.create_image(req.session, 3)			
		}
		if ('photo_4' in req.files) {
			let Upload_file_4 = req.files.photo_4;
			Upload_file_4.mv('./public/images/'+req.params.user+'/photo_4.jpg', function(err) {
			})
			image.create_image(req.session, 4)			
		}
	res.redirect("/edit_profil/"+req.params.user)
	}


	// 	var i = 0;
	// 	while (i < req.files.lenght) {
	// 	}
	// }
	else if (req.body.type == 1) {
		//Changement tag
		console.log("WTF_0")
		tag.delete_tag_user(req.session.user.login, function(){
			if (_.isString(req.body.tag) == true) {
				var array = [req.body.tag]	
			}
			else {
				console.log("type_2 = "+typeof(req.body.tag))
				var array = _.uniq(req.body.tag)
			}
			_.each(array, function(item) {
				tag.create(req.session.user.login, item)	
			})
			res.redirect("/edit_profil/"+req.params.user)
		})
	}
	else if (req.body.type == 2) {
		//Changement info perso
		_.each(req.body, function(value, key) {
			console.log(key+" : "+value)
		})
		user.update_user(req.session.user.login, req.body, function(result) {
			user.get_user_content(req.session.user.login, function(result) {
				console.log("new bio = "+result.bio)
				_.each(result, function(value, key) {
					console.log(key+" : "+value+"<--")
				})
				 console.log(result.bio)
				req.session.user = {}
				req.session.user = result
				console.log("maj session")
				res.redirect("/edit_profil/"+req.params.user)
				// req.session.save()
		})
		})
		// console.log("Form -> "+req.body)
	}
}
