var connection = require("../config/db");
var _ = require('underscore');


class search {
	static get_all_user(cb) {
		connection.query("SELECT * FROM `user` \
			LEFT JOIN `photo` ON `user`.`id`=`photo`.`id_user` \
			AND `photo`.`is_profil`=1", (error, result) => {
				if(error) {
					throw error
				}
				if (cb) {
					cb(result)
				}				
			})
	}
	static get_all_tag_user(cb) {
		connection.query("SELECT * FROM `tag-user` \
			JOIN `user` ON `id_user`=`user`.`id` \
			JOIN `tag` ON `id_tag`=`tag`.`id` \
			LEFT JOIN `photo` ON `user`.`id`=`photo`.`id_user` \
			AND `photo`.`is_profil`=1", (error, result) => {
				if(error) {
					throw error
				}
				if (cb) {
					cb(result)
				}
			})
	}
}

module.exports = search;