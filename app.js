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
var gallery = require("./Models/gallery.js")

var app = express();


// Underscore accesible aux views
app.locals._ = _

/*<------------ Apply to all routes ------------>*/
function myMiddleware (req, res, next) {
  if (req.session.user && req.session.user.login && req.url != "/logout") {
    geo.update_user_location(req.session.user.login, function(location) {
      user.get_user_content(req.session.user.login, function(result) {
        result.passwd = null
        req.session.user = result
        console.log(req.session.user)
      })
    })
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
var relation = require("./routes/relation")
var search = require("./routes/search")
/**/

// Debut gestion appel

app.get('/', function(req, res) {
	if (req.session && req.session.user) {
    gallery.get_gallery(req.session.user, function(result) {
      res.render("profile_page", {
        title: "Hey "+req.session.user.login,
        session: req.session,
        gallery: result
      })
    })
	}
	else if (req.session){
    console.log("haha")
		res.render("index", {title: 'huhu', session: req.session});
	}
  else {
    console.log("hihi")
    res.redirect("/")
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

app.post('/relation0', relation.button_1)
app.post('/relation1', relation.block)
app.post('/relation2', relation.button_1_bis)

app.post('/search', search.post)
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
