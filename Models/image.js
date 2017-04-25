var connection = require("../config/db");
var _ = require("underscore")

class Image {
	static create(content, cb) {
		/*
		formatage content : content.usid = user_id, content.path = path,
		content.prof FALSE ou TRUE si profile picture
		*/
		connection.query("INSERT INTO `photo` (`id_user`, `path`, is_profil)")
	}
	static get_image_by_user(login, cb) {
		connection.query("SELECT `path`, `is_profil` FROM `photo` JOIN `user` ON `user`.`id` = `photo`.`id_user` WHERE `user`.`login`=? ORDER BY `photo`.`path`", [login], (error, result) => {
			if (error) {
				console.log(error)
				cb(-1)
			}
			else {
				console.log("login -> "+login)
				console.log("RESULTAT --> "+result)
				cb(result)
			}
	})
	}
	static get_profil_picture(login, cb) {
		connection.query("SELECT `path`, `is_profil` FROM `photo` JOIN `user` ON `user`.`id` = `photo`.`id_user` WHERE `user`.`login`=? AND `photo`.`is_profil` = 1 ORDER BY `photo`.`path`", login, (error, result) => {
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