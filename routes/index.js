var user = require("../Models/user.js")
var image = require("../Models/image.js")
var relation  = require("../Models/relation.js")
var search_mod = require("../Models/search_mod.js")
var gallery = require("../Models/gallery.js")
var _ = require('underscore');

module.exports.get = function(req, res) {
	if (req.session && req.session.user) {
    	gallery.get_gallery(req.session.user, function(result) {
    		var gallery = result
    		relation.get_all_blocked_user_display(req.session.user.id, function(result) {
    			var blocked_user = _.pluck(result, "login")
    			gallery = _.filter(gallery, function(value) {
    				return _.indexOf(blocked_user, value.login) == -1
    			})
		      	res.render("profile_page", {
		        	title: "Hey "+req.session.user.login,
		        	session: req.session,
		        	gallery: gallery
		      	})    			
    		})
    	})
	}
	else if (req.session){
		res.render("index", {title: 'huhu', session: req.session});
	}
 	else {
    	res.redirect("/")
  	}	
}

module.exports.post = function(req, res) {
	if (req.session && req.session.user) {
	    gallery.get_gallery(req.session.user, function(result) {
	      // TRIER SELON LES CRITERES
	      // Formattage -> body : age_min age_max distance_min distance_max pop_min pop_max
	      var true_sort = ["age up", "age down", "distance up", "distance down", "pop up", "pop down"]
	      if (req.body.age_min && req.body.age_max && req.body.age_min >= 0 && req.body.age_min <= 120 && req.body.age_max >= 0 && req.body.age_max <= 120 && req.body.age_max >= req.body.age_min) {
	        var age_min = req.body.age_min
	        var age_max = req.body.age_max
	      }
	      else {
	        var age_min = 0
	        var age_max = 120
	      }
	      if (req.body.distance_min && req.body.distance_max && req.body.distance_min >= 0 && req.body.distance_min <= 100000000 && req.body.distance_max >= 0 && req.body.distance_max <= 100000000 && req.body.distance_max >= req.body.distance_min) {
	        var distance_min = req.body.distance_min
	        var distance_max = req.body.distance_max
	      }
	      else {
	        var distance_min = 0
	        var distance_max = 100000000
	      }
	      if (req.body.pop_min && req.body.pop_max && req.body.pop_min >= 0 && req.body.pop_min <= 10000 && req.body.pop_max >= 0 && req.body.pop_max <= 10000 && req.body.pop_max >= req.body.pop_min) {
	        var pop_min = req.body.pop_min
	        var pop_max = req.body.pop_max
	      }
	      else {
	        var pop_min = 0
	        var pop_max = 10000
	      }
	      if (req.body.sort && _.indexOf(true_sort, req.body.sort) != -1) {
	      	var index = _.indexOf(true_sort, req.body.sort)
	      	if (index == 0) {
	      		var sort = "age"
	      		var rev = 0
	      	}
	      	else if (index == 1) {
	      		var sort = "age"
	      		var rev = 1
	      	}
	      	else if (index == 2) {
	      		var sort = "distance"
	      		var rev = 0
	      	}
	      	else if (index == 3) {
	      		var sort = "distance"
	      		var rev = 1
	      	}
	      	else if (index == 4) {
	      		var sort = "pop"
	      		var rev = 0
	      	}
	      	else if (index == 5) {
	      		var sort = "pop"
	      		var rev = 1
	      	}
	      }
	      else {
	      	var sort = "distance"
	      	var rev = 0
	      }
	      var filter_result = _.filter(result, function(value) {
	        return (value.age <= age_max && value.age >= age_min && value.distance <= distance_max && value.distance >= distance_min && value.pop >= pop_min && value.pop <= pop_max)
	      })
	      var sorted_result = _.sortBy(filter_result, sort)
	      if (rev == 1) {
	      	sorted_result = sorted_result.reverse()
	      }
	      relation.get_all_blocked_user_display(req.session.user.id, (result) => {
	      	var array_user = _.pluck(result, "login")
	      	sorted_result = _.filter(sorted_result, function(value) {
	      		return _.indexOf(array_user, value.login) == -1
	      	})
	    	res.render("profile_page", {
	        	title: "Hey "+req.session.user.login,
	        	session: req.session,
	        	gallery: sorted_result
	      })
	      })
	    })
	  }
}
