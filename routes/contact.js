var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('contact', {
  	title: 'Contact',
    data: {},
    errors: {}
  });
});

router.post('/', function(req, res) {
	console.log(req.body);
  res.render('thankyou', {
  	title: 'Contact Me',
    data: req.body, // { message, email }
    errors: {
      message: {
        msg: 'A message is required'
      },
      email: {
        msg: 'That email doesn‘t look right'
      }
    }
  });
});

module.exports = router;