var express = require('express');
var router = express.Router();
const pg = require('pg');
const config = {
    user: 'postgres',
    database: 'database',
    password: 'password',
    port: 5432
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

var re;
router.post('/getUsersData', function(req, res){
	pool.connect(function (err, client, done) {
	   if (err) {
	       console.log("Can not connect to the DB" + err);
	   }
	   client.query('SELECT * FROM talent', function (err, result) {
	        done();
	        if (err) {
	            console.log(err);
	        }
	        var talent = JSON.stringify(result.rows);
		    res.end(talent);
	   })
	});

});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Talent'});
});



module.exports = router;
