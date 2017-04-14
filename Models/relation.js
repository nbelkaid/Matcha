var connection = require("../config/db");
var _ = require("underscore")

class relation {
	static create_like(id_aut, id_rec, cb) {
		connection.query("DELETE FROM `relation` WHERE `user_aut`=? AND `user_rec`=? AND `type` != 2", [id_aut, id_rec], (error, result) => {
			connection.query("SELECT `type` FROM `relation` WHERE `user_aut`=? AND `user_rec`=? AND `type`=1", [id_rec, id_aut], (error, result) => {
				if(result && result.length > 0) {
					connection.query("DELETE FROM `relation` WHERE (`user_aut`=? AND `user_rec`=?) OR (`user_aut`=? AND `user_rec`=?) ", [id_aut, id_rec, id_rec, id_aut], (error, result) => {
						connection.query("INSERT INTO `relation` (`user_aut`, `user_rec`, `type`) VALUES (?, ?, ?)", [id_aut, id_rec, 2])
						connection.query("INSERT INTO `relation` (`user_aut`, `user_rec`, `type`) VALUES (?, ?, ?)", [id_rec, id_aut, 2], (error, result) => {
							if(error) {
								throw error
							}
							else if(cb) {
								cb(result)
							}
						})
					})
				}
				else {
					// like
					connection.query("DELETE FROM `relation` WHERE `user_aut`=? `user_rec`=?", [id_aut, id_rec], (error, result) => {
						connection.query("INSERT INTO `relation` (`user_aut`, `user_rec`, `type`) VALUES (?, ?, ?)", [id_aut, id_rec, 1], (error, result) => {
							if(error) {
								throw error
							}
							else if(cb) {
								cb(result)
							}
						})
					})
				}
			})
		})
	}
	static unlike(id_aut, id_rec, cb) {
		connection.query("SELECT `type` FROM `relation` WHERE `user_aut`=? AND `user_rec`=? AND `type`=2", [id_rec, id_aut], (error, result) => {
			if(result && result.length > 0) {
				// unmatch
				connection.query("DELETE FROM `relation` WHERE (`user_aut`=? AND `user_rec`=?) OR (`user_aut`=? AND `user_rec`=?)", [id_aut, id_rec, id_rec, id_aut], (error, result) => {
					connection.query("INSERT INTO `relation` (`user_aut`, `user_rec`, `type`) VALUES (?, ?, ?)", [id_rec, id_aut, 1], (error, result) => {
						if(error) {
							throw error
						}
						else if(cb) {
							cb(result)
						}
					})
				})
			}
			else {
				// unlike
					connection.query("DELETE FROM `relation` WHERE `user_aut`=? AND `user_rec`=? AND `type`=1", [id_aut, id_rec], (error, result) => {
						if(error) {
							throw error
						}
						else if(cb) {
							cb(result)
						}
					})
			}
		})
	}
	static block(id_aut, id_rec, cb) {
		connection.query("DELETE FROM `relation` WHERE (`user_aut`=? AND `user_rec`=?) OR (`user_aut`=? AND `user_rec`=?)", [id_aut, id_rec, id_rec, id_aut], (error, result) => {
			connection.query("INSERT INTO `relation` (`user_aut`, `user_rec`, `type`) VALUES (?, ?, ?)", [id_aut, id_rec, -1], (error, result) => {
				cb()
			})
		})
	}
	static like_exist(id_aut, id_rec, cb) {
		connection.query("SELECT * FROM `relation` WHERE `user_aut`=? AND `user_rec`=? AND `type` >= 1", [id_aut, id_rec], (error, result) => {
			cb(result)
		})
	}
	static match_exist(id_1, id_2, cb) {
		connection.query("SELECT * FROM `relation` WHERE `user_aut`=? AND `user_rec`=? AND `type` = 2", [id_1, id_2], (error, result) => {
			cb(result)
		})
	}
	static block_exist_display(id_1, id_2, cb) {
		connection.query("SELECT * FROM `relation` WHERE `type`= -1 AND ((`user_aut`=? AND `user_rec`=?) OR (`user_aut`=? AND `user_rec`=?))", [id_1, id_2, id_2, id_1], (error, result) => {
			if (error) {
				throw error
			}
			if (result && result.length > 0 && cb) {
				cb(true)
			}
			else {
				cb(false)
			}
		})
	}
	static button_1(id_aut, id_rec, cb) {
		connection.query("SELECT `type` FROM `relation` WHERE `user_aut`=? AND `user_rec`=?", [id_aut, id_rec], (error, result) => {
			if (error) {
				throw error
			}
			if (result && result.length) {
				if(result[0].type == 1) {
					cb(2)
				}
				else if(result[0].type == 2) {
					cb(4)
				}
			}
			else {
				connection.query("SELECT `type` FROM `relation` WHERE `user_aut`=? AND `user_rec`=? LIMIT 1", [id_rec, id_aut], (error, result) => {
					console.log("resultat b :"+result)
					if (error) {
						throw error
					}
					if (result && result.length) {
						if (result[0].type == 1) {
							cb(3)
						}
						else if (result[0].type == 2) {
							cb(4)
						}
					}
					else {
						cb(1)
					}
				})

			}
		})
	}
	static visit_pop(login, cb) {
		connection.query("UPDATE `user` SET `pop`= IF(`user`.`pop` + 1 >= 10000, 10000, `user`.pop + 1) WHERE `login` = ? AND `pop` >= 0 AND pop <= 10000", [login], (error, result) => {
			if (error) {
				throw error
			}
			if (cb) {
				cb()
			}
		})
	}
	static block_pop(login, cb) {
		connection.query("UPDATE `user` SET `pop`= IF(`user`.`pop` - 20 <= 0, 0, `user`.`pop` - 20) WHERE `id` = ? AND `pop` >= 0 AND pop <= 10000", [login], (error, result) => {
			if (error) {
				throw error
			}
			if (cb) {
				cb()
			}
		})
	}
	static like_pop(login, cb) {
		connection.query("UPDATE `user` SET `pop`= IF(`user`.`pop` + 10 > 10000, 10000, `user`.`pop` + 10)  WHERE `id` = ? AND `pop` >= 0 AND pop <= 10000", [login], (error, result) => {
			if (error) {
				throw error
			}
			if (cb) {
				cb()
			}
		})
	}
	static unlike_pop(login, cb) {
		connection.query("UPDATE `user` SET `pop`= IF(`user`.`pop` - 10 < 0, 0, `user`.`pop` - 10) WHERE `id` = ? AND `pop` >= 0 AND pop <= 10000", [login], (error, result) => {
			if (error) {
				throw error
			}
			if (cb) {
				cb()
			}
		})
	}
}

module.exports = relation;