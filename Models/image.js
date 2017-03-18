var connection = require("../config/db");

class Image {
	static create(content, cb) {
		/*
		formatage content : content.usid = user_id, content.path = path,
		content.prof FALSE ou TRUE si profile picture
		*/
		connection.query("INSERT INTO `photo` (`id_user`, `path`, is_profil)")
	}
	static get_image_by_user(login, cb) {
		connection.query("SELECT `path`, `is_profil` FROM `photo` JOIN `user` ON `user`.`id` = `photo`.`id_user` WHERE `user`.`login` = ? ORDER BY `photo`.`path`", login, (error, result) => {
			if (error) {
				console.log(error)
				cb(-1)
			}
			else {
				cb(result)
			}
	})
	}
	static get_profil_picture(login, cb) {
		connection.query("SELECT `path`, `is_profil` FROM `photo` JOIN `user` ON `user`.`id` = `photo`.`id_user` WHERE `user`.`login` = ? AND `photo`.`is_profil` = 1 ORDER BY `photo`.`path`", login, (error, result) => {
			if (error) {
				console.log(error)
				cb(-1)
			}
			else {
				console.log("huhu"+result)
				console.log(result[0])
				console.log(result.lenght)
				cb(result)
			}
	})
	}
	static create_all_image(req, cb) {
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
		cb()
	}
	static create_image(session, nbr) {
		var path = "/images/"+session.user.login+"/photo_"+nbr
		var values = [session.user.id, path, 0]
		connection.query("DELETE FROM `photo` WHERE `id_user`=? AND `path`=?", [session.user.id, path], () => {
			connection.query("INSERT INTO `photo` (`id_user`, `path`, `is_profil`) VALUES (?, ?, ?)", values)
		})
	}
	static set_profile_picture(login, path, cb) {
		connection.query("UPDATE `photo` JOIN `user` ON `id_user`=`user`.`id` SET `is_profil`=0 WHERE `user`.`login` = ?", login, (error, result) => {
			connection.query("UPDATE `photo` JOIN `user` ON `id_user`=`user`.`id` SET `is_profil`=1 WHERE `user`.`login` = ? AND `photo`.`path`=?",[login, path], () => {
				cb()
			})
		})
	}
	static delete_picture(login, path, cb) {
		console.log("Path ->"+path)
		connection.query("DELETE FROM `photo` WHERE `path`=? AND `id_user` IN (SELECT `id` FROM `user` WHERE `login`=?)", [path, login], () => {
			cb()
		})
	}
}

module.exports = Image;