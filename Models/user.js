var connection = require("../config/db");
var bcrypt = require('bcrypt');
var _ = require('underscore')
var moment = require('moment')

class User {
	static create(content, cb) {
		var hash = bcrypt.hashSync(content.p, 8);
		var gender = (content.gender == 'male') ? 0 : 1;
		if (content.orient == 'Heterosexuel') {
			var orient = 0
		}
		else if (content.orient == 'Gay') {
			var orient = 2
		}
		else {
			var orient = 1
		}
		var age = moment().diff(content.birth, 'years')
		var values = [content.u, hash, content.m, gender, content.first_n, content.last_n, content.phone, orient, content.birth, age]
		console.log(values)
		connection.query("SELECT * FROM `user` WHERE login=? OR phone=? OR eemail=?", [content.u, content.phone, content.m], (error, result) => {
			if (error)
			{
				console.log(error)
				cb(-1);
			}
			else if (result && result.length > 0) {
				if (result[0].login == content.u)
					cb(1)
				else if (result[0].eemail == content.m)
					cb(2)
				else if (result[0].phone == content.phone)
					cb(3)
			}
			else {
				console.log("Resultat requete")
				console.log(result)
				connection.query("INSERT INTO `user` (`login`, `passwd`, `eemail`, `kind`, `first_n`, `last_n`, `phone`, `looking_for`, `birth`, `age`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", values, (error, result) => {
				console.log(result)
				if (error)
					console.log(error)
					cb(-1)
				})
				cb(0);
			}
		})
	}
	static connect(content, session, cb) {
		var hash = bcrypt.hashSync(content.p, 8);
		console.log(session)
		connection.query("SELECT * FROM `user` WHERE `login`=?", [content.u], (error, result) => {
			if (error) {
				console.log(error)
				cb(-1)
			}
			else if (result.length == 0 || bcrypt.compareSync(content.p, result[0].passwd) == false) {
				cb(0)
			}
			else if (result[0].login == content.u && bcrypt.compareSync(content.p, result[0].passwd) == true) {
				console.log(content)
				session.user = {}
				result[0].passwd = null
				session.user = result[0]
				console.log(session)
				session.save()
				cb(1)
			}
		})
	}
	static is_true_passwd(login, passwd) {
		connection.query("SELECT * FROM `user` WHERE `login`=?", [content.u], (error, result, session) => {
			console.log(result)
			if (error) {
				console.log(error)
				cb(-1)
			}
			else if (result.length == 0 || bcrypt.compareSync(content.p, result[0].passwd) == false) {
				cb(0)
			}
			else if (result[0].login == content.u && bcrypt.compareSync(content.p, result[0].passwd) == true) {
				session.user = content.login
				// session.save()
				cb(1)
			}
		})	
	}
	static get_user_content(login, cb) {
		connection.query("SELECT * FROM `user` WHERE `login`=?", login, (error, result, session) => {
			console.log(result)
			if (error) {
				cb(-1)
			}
			else if (result.length == 0) {
				cb(0)
			}
			else {
				result[0].passwd = null
				cb(result[0])
			}
		})	
	}
	static update_user(login, content, cb) {
		this.get_user_content(login, function(result) {
			_.each(result, function(key, value) {
				console.log("-->"+key+" : "+value+"<--")
			})
			if (!content.orient) {

			}
			if (content.orient == "Heterosexuel") {
				var orient = 0
			}
			else if (content.orient == "Gay") {
				var orient = 2
			}
			else {
				var orient = 1
			}
			var info = {
				eemail: (content.m == null || content.m == '') ? result.eemail : content.m,
				last_n: (content.l_n == null || content.l_n == '') ? result.last_n : content.l_n,
				first_n: (content.f_n == null || content.f_n == '') ? result.first_n : content.f_n,
				age: (content.birth == null || content.birth == '') ? result.age : moment().diff(content.birth, 'years'),
				phone: (content.phone == null || content.phone == '') ? result.phone : content.phone,
				looking_for: orient,
				bio: (content.bio == null || content.bio == '') ? result.bio : content.bio
			}
			_.each(info, function(value, key, index) {
				console.log("->"+key+" : "+value)
			})
			connection.query("UPDATE `user` SET ? WHERE `login` = ?", [info , login], (error, result) => {
				if (error) {
					throw error
				}
				if (cb) {
					cb(result)
				}
			})
		})
	}
	static get_all_user(cb) {
		connection.query("SELECT * FROM `user` LEFT JOIN `photo` ON `photo`.id_user=`user`.id AND `photo`.is_profil=1", (error, result) => {
			cb(result)
		})
	}
}

module.exports = User;