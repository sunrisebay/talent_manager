var express = require('express');
var router = express.Router();
var database = require('../middleware/database.js')
var jsonUtils = require('../helpers/jsonObjectHelper.js')
const { add, getTsInfo, getSocialMediaData } = require('../middleware/database.js')

router.get('/', async function(req, res) {
  let tsData = await getTsInfo();
  let socialMediaData = await getSocialMediaData();
  res.render('contact', {
  	title: 'Contact',
    tsData: jsonUtils.encodeJSON(tsData.rows),
    socialMediaData: jsonUtils.encodeJSON(socialMediaData.rows)
  });
});

router.post('/sendUserData', async function(req, res) {
  let values = [req.body.creatorid, req.body.username, req.body.firstname + " " + req.body.lastname, 
			    	req.body.ta , req.body.ts, req.body.curretstatus,
			    	"dummy a", "dummy b", req.body.phone,
			    	req.body.email, req.body.region, 
			    	req.body.category1 + "," + req.body.category2 + "," + req.body.category3  ]
  let data = await add(values);
});

module.exports = router;
