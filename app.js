var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session')
var index = require('./routes/index');
var users = require('./routes/users');
var fileUpload = require('express-fileupload');
var _ = require('underscore')

var geo = require("./Models/geo.js")
var user = require("./Models/user.js");

var app = express();


// Underscore accesible aux views
app.locals._ = _

/*<------------ Apply to all routes ------------>*/
function myMiddleware (req, res, next) {
  console.log("test")
  if (req.session.user) {
    console.log("test_2")
    geo.update_user_location(req.session.user.login, function(location) {
      console.log("test_3")
    })
    next()
  }
  next()
   // if (req.session && req.session.user && req.method === 'GET') {
   //  geo.update_user_location(req.session.user.login, function(location) {
   //    console.log("test_2")
   //    console.log("LOCATION ---> "+location.loc)
   //  })
   // }
}
// /* <-----------------------------> */

app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['42424242'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))




app.use(fileUpload());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(myMiddleware)

/*Required routes*/
var create = require("./routes/create")
var login = require("./routes/login")
var logout = require("./routes/logout")
var profil = require("./routes/profil")
var edit = require("./routes/edit")
var photo = require("./routes/photo")
/**/

// Debut gestion appel

app.get('/', function(req, res) {
	if (req.session.user) {
    user.get_all_user(function(result) {
      console.log(typeof(result))
      _.each(result, function(key, value) {
        console.log("key: "+key+", value:"+value)
      })
    res.render("profile_page", {
      title: "Hey "+req.session.user.login,
      session: req.session,
      gallery: result
    })
    })
	}
	else {
		res.render("index", {title: 'huhu', session: req.session});
	}
})


app.get('/create', create.get)
app.post('/create', create.post)

app.post('/form_access', login.post)

app.get('/logout', logout.get)

app.get('/profil/:user', profil.get)

app.get('/edit_profil/:user', edit.get)
app.post('/edit_profil/:user', edit.post)

app.get('/delete_photo:nbr', photo.delete)
app.get('/set_prof:nbr', photo.set_prof)

//Fin gestion appel


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});


app.listen(3000, function() {
console.log("Server start -> http://localhost:3000/")
})

module.exports = app;
