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
				connection.query("SELECT `user`.*, `photo`.`path`, \
					(ACOS((SIN(? * 0.01744) * SIN(`user`.`lat` * 0.01744)) + (COS(? * 0.01744) * COS(`user`.`lat` * 0.01744) * COS(`user`.`lng` * 0.01744 - ? * 0.01744))) * 6378137) AS `distance` \
					FROM `user` \
					LEFT JOIN `photo` ON `photo`.`id_user`=`user`.`id` AND `photo`.`is_profil`=1 \
					WHERE `user`.`kind`=1 AND `user`.`looking_for` <= 1 \
					AND `user`.`id` != ? \
					", [prof_cont.lat, prof_cont.lat, prof_cont.lng, id_prof],(error, result) => {
						if(error) {
							throw error
						}
						else {
							cb(result)	
						}
					})
			}
			else if (looking_for == 2) {
				connection.query("SELECT `user`.*, `photo`.`path`, \
					(ACOS((SIN(? * 0.01744) * SIN(`user`.`lat` * 0.01744)) + (COS(? * 0.01744) * COS(`user`.`lat` * 0.01744) * COS(`user`.`lng` * 0.01744 - ? * 0.01744))) * 6378137) AS `distance` \
				 FROM `user` \
					LEFT JOIN `photo` ON `photo`.`id_user`=`user`.`id` AND `photo`.`is_profil`=1 \
					WHERE `user`.`kind`=0 AND `user`.`looking_for` >= 1 \
					AND `user`.`id` != ? ", [prof_cont.lat, prof_cont.lat, prof_cont.lng, id_prof],(error, result) => {
						if(error) {
							throw error
						}
						else {
							cb(result)
						}
					})
			}
			else if (looking_for == 1) {
				connection.query("SELECT `user`.*, `photo`.`path`, \
					(ACOS((SIN(? * 0.01744) * SIN(`user`.`lat` * 0.01744)) + (COS(? * 0.01744) * COS(`user`.`lat` * 0.01744) * COS(`user`.`lng` * 0.01744 - ? * 0.01744))) * 6378137) AS `distance` \
				 FROM `user` \
					LEFT JOIN `photo` ON `photo`.`id_user`=`user`.`id` AND `photo`.`is_profil`=1 \
					WHERE ((`user`.kind = 0 AND `user`.`looking_for` >= 1) \
					OR (`user`.kind = 1 AND `user`.`looking_for` <= 1)) \
					AND `user`.`id` != ? ", [prof_cont.lat, prof_cont.lat, prof_cont.lng, id_prof],(error, result) => {
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
				connection.query("SELECT `user`.*, `photo`.`path`, \
					(ACOS((SIN(? * 0.01744) * SIN(`user`.`lat` * 0.01744)) + (COS(? * 0.01744) * COS(`user`.`lat` * 0.01744) * COS(`user`.`lng` * 0.01744 - ? * 0.01744))) * 6378137) AS `distance` \
				 FROM `user` \
					LEFT JOIN `photo` ON `photo`.`id_user`=`user`.`id` AND `photo`.`is_profil`=1 \
					WHERE `user`.`kind`=0 AND `user`.`looking_for` <= 1 \
					AND `user`.`id` != ? ", [prof_cont.lat, prof_cont.lat, prof_cont.lng, id_prof],(error, result) => {
						if(error) {
							throw error
						}
						else {
							cb(result)	
						}
					})
			}
			else if (looking_for == 2) {
				connection.query("SELECT `user`.*, `photo`.`path`, \
					(ACOS((SIN(? * 0.01744) * SIN(`user`.`lat` * 0.01744)) + (COS(? * 0.01744) * COS(`user`.`lat` * 0.01744) * COS(`user`.`lng` * 0.01744 - ? * 0.01744))) * 6378137) AS `distance` \
				 FROM `user` \
					LEFT JOIN `photo` ON `photo`.`id_user`=`user`.`id` AND `photo`.`is_profil`=1 \
					WHERE `user`.`kind`=1 AND `user`.`looking_for` >= 1 \
					AND `user`.`id` != ? ", [prof_cont.lat, prof_cont.lat, prof_cont.lng, id_prof],(error, result) => {
						if(error) {
							throw error
						}
						else {
							cb(result)	
						}
					})
			}
			else if (looking_for == 1) {
				connection.query("SELECT `user`.*, `photo`.`path`, \
					(ACOS((SIN(? * 0.01744) * SIN(`user`.`lat` * 0.01744)) + (COS(? * 0.01744) * COS(`user`.`lat` * 0.01744) * COS(`user`.`lng` * 0.01744 - ? * 0.01744))) * 6378137) AS `distance` \
				 FROM `user` \
					LEFT JOIN `photo` ON `photo`.`id_user`=`user`.`id` AND `photo`.`is_profil`=1 \
					WHERE ((`user`.kind = 0 AND `user`.`looking_for` <= 1) \
					OR (`user`.kind = 1 AND `user`.`looking_for` >= 1)) \
					AND `user`.`id` != ? ", [prof_cont.lat, prof_cont.lat, prof_cont.lng, id_prof],(error, result) => {
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
