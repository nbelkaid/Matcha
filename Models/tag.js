var connection = require("../config/db");
var _ = require('underscore');
class Tag {
	static create(login, content) {
		this.create_tag(content, function(result) {
			var val = [login, content];
			console.log("Create tag-user :"+content)
			connection.query("INSERT INTO `tag-user` (`id_user`, `id_tag`) VALUES ((SELECT `id` FROM `user` WHERE `login`=?), (SELECT `id` FROM `tag` WHERE `name`=? LIMIT 1))", val)
		})
	}
	static create_tag(content, callback) {
		this.tag_exist(content, function(result) {
			if (!result || !result[0] || !result[0].name) {
				console.log("Create tag :"+content)
				connection.query("INSERT INTO `tag` (`name`) VALUES (?)", content)				
			}
			else if (result[0].name) {
			}
			callback(result)
		});
	}
	static tag_exist(content, cb) {
		connection.query("SELECT `name` FROM `tag` WHERE `name` = ? ", content, (error, result) => {
			if (error) {
				console.log(error)
				cb(-1)
			}
			else {
				console.log(result);
				cb(result);
			}
		})
	}
	static get_tag_user(login, cb) {
		connection.query("SELECT `name` FROM `tag-user` JOIN `user` ON `tag-user`.`id_user` = `user`.`id` JOIN `tag` ON `tag-user`.`id_tag` = `tag`.`id` WHERE `login` = ?" , login, (error, result) => {
			if (error) {
				console.log(error)
				cb(-1)
			}
			else {
				console.log("huhu"+result)
				console.log(result[0])
				console.log(result.lenght)
				var arr = _.pluck(result, 'name')
				console.log("arr = "+arr)
				cb(arr)
				return arr;
			}
	})	
	}
	static delete_tag_user(login, cb) {
		connection.query("DELETE FROM `tag-user` WHERE `id_user`=(SELECT `id` FROM `user` WHERE `login`=?)", login)
		cb(1);
	}
}

module.exports = Tag;