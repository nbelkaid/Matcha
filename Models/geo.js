var request = require('request')
var _ = require('underscore')
var connection = require("../config/db");
var	moment = require("moment")

class GeoIp {
	static get_location(cb) {
			request('http://ipinfo.io/geo', function(error, res, body) {
			console.log("--> Geolocalisation <--")
			console.log(JSON.parse(body))
			console.log("--> Fin <--")
			cb(JSON.parse(body))
		}) 
	}
	static update_user_location(login, cb) {
	// 	if ("geolocation" in navigaor) {
	// 		console.log("HUHU")
	// 	}
	// 	else {
	// 		request('http://ipinfo.io/geo', function(error, res, body) {
	// 			var location = JSON.parse(body)
	// 			var values = {
	// 				city: location.city,
	// 				country: location.country,
	// 				zip: location.postal,
	// 				lat: location.loc.split(",")[0],
	// 				lng: location.loc.split(",")[1]
	// 			}
	// 			connection.query("UPDATE `user` SET ? WHERE `login`=?", [values, login])
	// 			cb(location)
	// 		})
	// 	}
	// }
	console.log("test_4")
	request('http://ipinfo.io/geo', function(error, res, body) {
		console.log("test_5")
		var location = JSON.parse(body)
		var values = {
			city: location.city,
			country: location.country,
			zip: location.postal,
			lat: location.loc.split(",")[0],
			lng: location.loc.split(",")[1],
			last_connection: moment().format('YYYY-MM-DD HH:mm:ss')
		}
		console.log(values)
		connection.query("UPDATE `user` SET ? WHERE `login`=?", [values, login], (error, result) => {
			cb(location)
		})
	})
}
}

module.exports = GeoIp;