var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { arr: [] });
});


router.post('/', function (req, res) {
  var rp = require('request-promise');
  var dest = req.body.location;
  var term = req.body.search;

  var options = {
    uri: 'https://api.yelp.com/v3/businesses/search',
    qs: {
        location: dest,
        term: term
    },
    headers: {
        'User-Agent': 'Request-Promise',
        'Authorization': 'bearer ' + ''
    },
    json: true
  };

  rp(options)
      .then(function (repos) {
          res.render('index', { json: repos});
      })
      .catch(function (err) {
        console.log(err);
        res.render('index', {error: "API Call Failed", arr: []})
      });
});

module.exports = router;
