var connection = require("../config/db");

class relation {
	static create_like(login_aut, login_rec) {
		connection.query("SELECT `type` FROM `relation` WHERE `user_aut`=? AND `user_rec`=? AND `type`=1", [login_rec, login_aut], (error, result) => {
			if(result) {
				// Le like inverse existe
				connection.query("DELETE FROM `relation` WHERE `user_aut`=? AND `user_rec`=? ", [login_aut, login_rec], (error, result) => {
					connection.query("INSERT INTO `relation` (`user_aut`, `user_rec`, `type`) VALUES (?, ?, ?)", [login_aut, login_rec, 2])
					connection.query("INSERT INTO `relation` (`user_aut`, `user_rec`, `type`) VALUES (?, ?, ?)", [login_rec, login_aut, 2])
				})
			}
			else if(!result) {
				// Le like inverse n'existe pas
					connection.query("INSERT INTO `relation` (`user_aut`, `user_rec`, `type`) VALUES (?, ?, ?)", [login_aut, login_rec, 1])
			}
		})
	}
	static unlike(login_aut, login_rec) {
		connection.query("SELECT `type` FROM `relation` WHERE `user_aut`=? AND `user_rec`=? AND `type`=2", [login_rec, login_aut], (error, result) => {
			if(result) {
				// Le like inverse existe
				connection.query("DELETE FROM `relation` WHERE (`user_aut`=? AND `user_rec`=?) OR (`user_aut`=? AND `user_rec`=?)", [login_aut, login_rec, login_rec, login_aut], (error, result) => {
					connection.query("INSERT INTO `relation` (`user_aut`, `user_rec`, `type`) VALUES (?, ?, ?)", [login_rec, login_aut, 1])
				})
			}
			else if(!result) {
				// Le like inverse n'existe pas
					connection.query("DELETE FROM `relation` WHERE `user_aut`=? AND `user_rec=?` AND `type`=1", [login_aut, login_rec])
			}
		})
	}
	static block(login_aut, login_rec) {
		connection.query("DELETE FROM `relation` WHERE (`user_aut`=? AND `user_rec`=?) OR (`user_aut`=? AND `user_rec`=?)", [login_aut, login_rec, login_rec, login_aut] () => {
			connection.query("INSERT INTO `relation` (`user_aut`, `user_rec`, `type`) VALUES (?, ?, ?)", [login_aut, login_rec, -1])
		})
	}
}

module.exports = relation;