var mysql = require('mysql');
//function ini untuk Kedatabase , sesuaikan dengan Database MYSQL nya
var con = mysql.createConnection({
	host : "localhost",
	user : "root",
	paswword : "",
	database : "kbli",
});
con.connect(function(err){
	if(err) throw err;
});
module.exports = con;