var connection = require("../config/db");
var _ = require('underscore');


class Gallery {
	static get_all_user() {
	}
	static get_gallery(prof_cont, cb) {
		var kind = prof_cont.kind
		var looking_for = prof_cont.looking_for
		var id_prof = prof_cont.id
		var lat_prof = prof_cont.lat
		var lng_prof = prof_cont.lng
		if (kind == 0) {
			if (looking_for == 0) {
				var str = "IF (? > 0, ) \
					ACOS((SIN(?) * SIN(`user`.`lat`)) + (COS(?) * COS(`user`.`lat`) * COS(`user`.`lng` - ?))) * 6378137) AS `distance`\
					"
				connection.query("SELECT `user`.*, `photo`.`path` \
					FROM `user` \
					LEFT JOIN `photo` ON `photo`.`id_user`=`user`.`id` AND `photo`.`is_profil`=1 \
					WHERE `user`.`kind`=1 AND `user`.`looking_for` <= 1 \
					AND `user`.`id` != ? \
					", [id_prof],(error, result) => {
						if(error) {
							throw error
						}
						else {
							cb(result)	
						}
					})
			}
			else if (looking_for == 2) {
				connection.query("SELECT `user`.*, `photo`.`path` FROM `user` \
					LEFT JOIN `photo` ON `photo`.`id_user`=`user`.`id` AND `photo`.`is_profil`=1 \
					WHERE `user`.`kind`=0 AND `user`.`looking_for` >= 1 \
					AND `user`.`id` != ? ", [id_prof],(error, result) => {
						if(error) {
							throw error
						}
						else {
							cb(result)
						}
					})
			}
			else if (looking_for == 1) {
				console.log("HAHAHA ds")
				connection.query("SELECT `user`.*, `photo`.`path` FROM `user` \
					LEFT JOIN `photo` ON `photo`.`id_user`=`user`.`id` AND `photo`.`is_profil`=1 \
					WHERE ((`user`.kind = 0 AND `user`.`looking_for` >= 1) \
					OR (`user`.kind = 1 AND `user`.`looking_for` <= 1)) \
					AND `user`.`id` != ? ", [id_prof],(error, result) => {
						if(error) {
							throw error
						}
						else {
							cb(result)	
						}
					})
			}
		}
		else if (kind == 1) {
			if (looking_for == 0) {
				connection.query("SELECT `user`.*, `photo`.`path` FROM `user` \
					LEFT JOIN `photo` ON `photo`.`id_user`=`user`.`id` AND `photo`.`is_profil`=1 \
					WHERE `user`.`kind`=0 AND `user`.`looking_for` <= 1 \
					AND `user`.`id` != ? ", [id_prof],(error, result) => {
						if(error) {
							throw error
						}
						else {
							cb(result)	
						}
					})
			}
			else if (looking_for == 2) {
				connection.query("SELECT `user`.*, `photo`.`path` FROM `user` \
					LEFT JOIN `photo` ON `photo`.`id_user`=`user`.`id` AND `photo`.`is_profil`=1 \
					WHERE `user`.`kind`=1 AND `user`.`looking_for` >= 1 \
					AND `user`.`id` != ? ", [id_prof],(error, result) => {
						if(error) {
							throw error
						}
						else {
							cb(result)	
						}
					})
			}
			else if (looking_for == 1) {
				connection.query("SELECT `user`.*, `photo`.`path` FROM `user` \
					LEFT JOIN `photo` ON `photo`.`id_user`=`user`.`id` AND `photo`.`is_profil`=1 \
					WHERE ((`user`.kind = 0 AND `user`.`looking_for` <= 1) \
					OR (`user`.kind = 1 AND `user`.`looking_for` >= 1)) \
					AND `user`.`id` != ? ", [id_prof],(error, result) => {
						if(error) {
							throw error
						}
						else {
							cb(result)	
						}
					})
			}
		}
		else {
			cb(null)
		}
	}
}

module.exports = Gallery;
