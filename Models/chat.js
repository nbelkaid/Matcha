var connect = require('../config/db')
var moment  = require('moment')
var _       = require('underscore')

class Messages {

	static get_all_message_with_id_user_and_id_user(id_aut, id_rec, cb) {

		var relation = require('./relation.js')
		var user     = require('./user.js')

		relation.match_exist(id_user, id_rec, function(relation) {

			if (relation) {

				connect.query('SELECT *  FROM `messages` WHERE id_aut = ? AND id_rec = ? OR id_rec = ? AND id_aut = ?', [id_aut, id_rec, id_user, id_rec], (error, result) => {

					if (error) throw error

					var messages = []

					result.forEach(function(message){

						messages.push({
							class    : message.id_aut == id_user ? 'message-author' : 'message-receiver',
							content  : content,
							date     : moment(date).fromNow()
						})

					})

					cb(messages)
				
				})
			}
		})

	}

	static get_all_message_with_id_user_and_first_and_last_name(id_user, first_name, last_name, cb) {

		var relations = require('./relation.js')

		connect.query('SELECT * FROM `user` WHERE first_name = ? AND last_name = ?', [first_name, last_name], (error, to) => {

			if (to && to.length > 0) {

				to.forEach(function(to_result) {

					relation.match_exist(id_user, to_result.id, function(relation) {

						if (relation) {

							connect.query('SELECT id_aut, id_rec, content, date FROM `messages` WHERE id_aut = ? AND id_rec = ? OR id_rec = ? AND id_aut = ?', [id_user, to_result.id, id_user, to_result.id], (error, result) => {

								if (error) throw error

								var messages = []

								result.forEach(function(message){

									messages.push({
										class    : message.id_aut == id_user ? 'message-author' : 'message-receiver',
										content  : message.content,
										date     : moment(message.date).fromNow()
									})

								})
								cb(messages)

							})

						}

						else cb(null)

					})

				})
			}

			else cb(null)

		})

	}

	static get_all_message_with_id_user_and_login(id_user, login, cb) {

		var relation = require('./relation.js')
		var user     = require('./user.js')

		user.get_user_content(login, function(to) {

			if (to == null) cb(null)

			else {

				relation.match_exist(id_user, to.id, function(relation) {

					if (relation) {

						connect.query('SELECT id_aut, id_rec, content, date FROM `messages` WHERE id_aut = ? AND id_rec = ? OR id_rec = ? AND id_aut = ? ORDER BY `date`', [id_user, to.id, id_user, to.id], (error, result) => {

							if (error) throw error

							var messages = []

							result.forEach(function(message){

								messages.push({
									class    : message.id_aut == id_user ? 'message-author' : 'message-receiver',
									content  : message.content,
									date     : moment(message.date).fromNow()
								})

							})
							cb(messages)

						})

					}

					else cb(null)

				})
			}

		})

	}

	static create_with_id_user_and_id_user(id_aut, id_rec, content, cb) {

		var relation = require('./relation.js')
		var user = require('./user.js')

		var values = [id_aut, id_rec, content]

		relation.match_exist(id_aut, id_rec, function(relation) {

			if (relation)

				connect.query("INSERT INTO `messages` (`id_aut`, `id_rec`, `content`) VALUES (?, ?, ?)", values, (error, result) => {

					if (error) throw error

						if (result) {
							cb({
								id_aut      : id_aut,
								id_rec      : id_rec,
								content     : content,
								date        : moment().fromNow()
							})
						}
					})

		})

	}

	static create_message_with_id_user_and_first_and_last_name(id_aut, first_name, last_name, content, cb) {

		var relations = require('./relation.js')

		connect.query('SELECT * FROM `user` WHERE first_name = ? AND last_name = ?', [first_name, last_name], (error, to) => {

			if (to && to.length > 0) {

				to.forEach(function(to_result) {

					var values = [id_aut, to_result.id, content]

					relations.match_exist(id_aut, to_result.id, function(relation) {

						if (relation) {

							connect.query("INSERT INTO `messages` (`id_aut`, `id_rec`, `content`) VALUES (?, ?, ?)", values, (error, result) => {

								if (error) throw error

									if (result) {
										cb({
											id_aut      : id_aut,
											id_rec      : to_result.id,
											content     : content,
											date        : moment().fromNow()
										})
									}

								})

						}

						else cb(null)

					})

				})
			}

			else cb(null)

		})

	}

	static create_message_with_id_user_and_login(id_aut, login, content, cb) {

		var relation = require('./relation.js')
		var user = require('./user.js')

		user.get_user_content(login, function(to) {

			if (to == null) cb(null)

				else {

					var values = [id_aut, to.id, content]

					relation.match_exist(id_aut, to.id, function(relation) {

						if (relation) {

							connect.query("INSERT INTO `messages` (`id_aut`, `id_rec`, `content`) VALUES (?, ?, ?)", values, (error, result) => {

								if (error) throw error

									if (result) {
										console.log('toto', content)
										cb({
											id_aut      : id_aut,
											id_rec      : to.id,
											content     : content,
											date        : moment().fromNow()
										})
									}

								})

						}

						else cb(null)

					})
				}

			})

	}

}

module.exports = Messages