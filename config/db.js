var mysql= require('mysql');

let connection= mysql.createConnection({
host : '127.0.0.1',
user : 'root',
password : 'Imac2742',
database : 'matcha',
port : '3306',
dateStrings : true
});

connection.connect(function(error) {
if (error)
	console.log(error);
});

module.exports = connection;