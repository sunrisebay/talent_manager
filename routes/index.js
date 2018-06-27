var express = require('express');
var router = express.Router();
const { select } = require('../middleware/database.js')

router.post('/getUsersData', async function(req, res){
  
  let data = await select();
  var talent = JSON.stringify(data.rows);
  res.end(talent);
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Talent'});
});



module.exports = router;
