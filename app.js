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
var notification = require("./Models/notification.js")

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// FIN 

//Whenever someone connects this gets executed
// io.on('connection', function(socket){
//   console.log('A user connected');
//   var socket = socket
//   if (req.session && req.session.user && req.session.user.id) {
//     notification.get_all_unread_notif(req.session.user.id, function(result) {
//       if (result && result.length > 0) {
//         var notif_nbr = result.length
//       }
//       else {
//         var notif_nbr = 0
//       }
//       console.log(notif_nbr)
//       socket.emit('notif-nbr', notif_nbr)
//     })
//   }
//   //Whenever someone disconnects this piece of code executed
//   socket.on('disconnect', function () {
//     console.log('A user disconnected');
//   });
// });


/*
function hoho (req, res) {
  var
      io = require('socket.io'),
      ioServer = io.listen(8000),
      sequence = 1;
      clients = [];
  // Event fired every time a new client connects:
  ioServer.on('connection', function(socket) {
      console.info('New client connected (id=' + socket.id + ').');
      clients.push(socket);

      // When socket disconnects, remove it from the list:
      socket.on('disconnect', function() {
          var index = clients.indexOf(socket);
          if (index != -1) {
              clients.splice(index, 1);
              console.info('Client gone (id=' + socket.id + ').');
          }
      });
  });

  // Every 1 second, sends a message to a random client:
  setInterval(function() {
      var randomClient;
      if (clients.length > 0) {
          randomClient = Math.floor(Math.random() * clients.length);
          clients[randomClient].emit('foo', sequence++);
      }
  }, 1000);
} */

// Underscore accesible aux views
app.locals._ = _

/*<------------ Apply to all routes ------------>*/
function myMiddleware (req, res, next) {
  if (req.session.user && req.session.user.login && req.url != "/logout") {
    geo.get_geoloc_user(req.session.user.id, function(geoloc) {
      if (geoloc == true) {
        // Geolocalisation IP
        geo.update_user_location(req.session.user.login, function(location) {
          user.get_user_content(req.session.user.login, function(result) {
            result.passwd = null
            req.session.user = result
          })
        })
      }
    })
    // Envoi nb notif a chaque page
  }
  next()
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
var index = require("./routes/index")
/**/

// Debut gestion appel

app.get('/', index.get)
app.post('/', index.post)

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


http.listen(3000, function() {
console.log("Server start -> http://localhost:3000/")
})

module.exports = app;
