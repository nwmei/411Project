var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/trip/:id', function(req, res, next) {
  const APIKEYS = require('../.idea/runConfigurations/api_key');

  var tripId = req.params['id'];
  
  res.render('map', { google_maps: APIKEYS.GOOGLE_MAPS});
  //res.render('index', { arr: [] });
});


router.post('/', function (req, res) {
  var rp = require('request-promise');
  var dest = req.body.location;
  var term = req.body.search;

  const APIKEYS = require('../.idea/runConfigurations/api_key');

  var options = {
    uri: 'https://api.yelp.com/v3/businesses/search',
    qs: {
        location: dest,
        term: term
    },
    headers: {
        'User-Agent': 'Request-Promise',
        'Authorization': 'bearer ' + APIKEYS.YELP
    },
    json: true
  };

  rp(options)
      .then(function (repos) {
          var arr = [];
          var ret = repos['businesses'];
          for (var i = 0; i < ret.length; i++) {
              var temp = [ret[i]['name'], ret[i]['rating'], ret[i]['phone']];
              arr.push(temp);
          }
          res.render('index', { arr: arr});
      })
      .catch(function (err) {
        console.log(err);
        res.render('index', {error: "API Call Failed", arr: []})
      });
});

module.exports = router;
