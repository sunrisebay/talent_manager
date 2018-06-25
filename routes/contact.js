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
	(async () => {

	  const client = await pool.connect()

	  try {
	    await client.query('BEGIN')
	    const { rows } = await client.query('INSERT INTO talent VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ', 
	    	[req.body.creatorid, req.body.username, req.body.firstname + " " + req.body.lastname, 
	    	req.body.ta , req.body.ts, req.body.curretstatus,
	    	"dummy a", "dummy b", req.body.phone,
	    	req.body.email, req.body.region, 
	    	req.body.category1 + "," + req.body.category2 + "," + req.body.category3  ])

	    await client.query('COMMIT')
	  } catch (e) {
	    await client.query('ROLLBACK')
	    throw e
	  } finally {
	    client.release()
	  }
	})().catch(e => console.error(e.stack))

});

module.exports = router;
