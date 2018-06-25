var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
const config = {
    user: 'postgres',
    database: 'database',
    password: 'password',
    port: 5432
};

const pool = new Pool(config)


router.get('/', function(req, res) {
  res.render('contact', {
  	title: 'Contact',
    data: {},
    errors: {}
  });
});

router.post('/sendUserData', function(req, res) {
	var sql_query = getQuery(req.body);
	(async () => {

	  const client = await pool.connect()

	  try {
	    await client.query('BEGIN')
	    const { rows } = await client.query('INSERT INTO talent(creatorid) VALUES($1) ', [req.body.creatorid])

	    await client.query('COMMIT')
	  } catch (e) {
	    await client.query('ROLLBACK')
	    throw e
	  } finally {
	    client.release()
	  }
	})().catch(e => console.error(e.stack))

});

var getQuery = function (bodystring) {
	var query = "insert into talent values('" + bodystring.creatorid 
		+ "','" + bodystring.username
		+"','" + bodystring.firstname + " " + bodystring.lastname
		+"','" + bodystring.ta 
		+"','" + bodystring.ts
		+"','" + bodystring.curretstatus 
		+"','dummy 6/19/18','dummy last feedback','"+ bodystring.phone
		+"','" + bodystring.email
		+"','" + bodystring.region
		+"','" + bodystring.category1 + "," + bodystring.category2 + "," + bodystring.category3 
		+"')";
	return "";
}


module.exports = router;
