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
	static create_image(session, nbr) {
		var path = "/images/"+session.user.login+"/photo_"+nbr
		var values = [session.user.id, path, 0]
		connection.query("INSERT INTO `photo` (`id_user`, `path`, `is_profil`) VALUES (?, ?, ?)", values)
	}
	static set_profile_picture(content) {

	}
}

module.exports = Image;