var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// app.post('/form_access', function(sReq, sRes){    
//     var login = sReq.query.email.;   
// }

router.post('form_access', function(req, res, next) {
  res.render('form_access', {
  	title: 'form_access',
  	login: 'huhu'
  });
});

module.exports = router;
