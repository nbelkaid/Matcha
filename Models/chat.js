var connection = require("../config/db");
var _ = require("underscore")

class chat {
	static create_message(id_aut, id_rec, content, cb) {
		var values = [id_aut, id_rec, content]
		connection.query("INSERT INTO `messages` (`id_aut`, `id_rec`, `content`) VALUES (?, ?, ?)", values, (error, result) => {
			if (error) {
				throw error
			}
			if (cb) {
				cb(result)
			}
		})
	}
	static create_notif(id_user, id_aut, type, cb) {
		var values = [id_user, id_aut, type]
		connection.query("INSERT INTO `notification` (`id_user`, `id_aut`, `type`) VALUES (?, ?, ?)", values, (error, result) => {
			if (error) {
				throw error
			}
			else if (cb) {
				cb(result.insertId)
			}
		})
	}
	static set_notif_read(id_not, cb) {
		var values = [id_not]
		connection.query("UPDATE `notification` SET `seen`=1 WHERE `id_not`=?", values, () => {
			if (cb) {
				cb(1)
			}
		})
	}
	static get_all_unread_notif(id_user, cb) {
		connection.query("SELECT `notification`.*, `user`.`login` FROM `notification` JOIN `user` ON `user`.`id`=`notification`.`id_aut` WHERE `id_user`=? AND `seen`=0 ", [id_user], (error, result) => {
			if (error) {
				throw error
			}
			if (cb) {
				cb(result)
			}
		})
	}
}

module.exports = chat;