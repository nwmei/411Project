var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', function (req, res) {
  var rp = require('request-promise');
  var options = {
    uri: 'http://api.hotwire.com/v1/search/hotel',
    qs: {
      apikey: '',
      dest: 'Boston',
      rooms: '1',
      adults: '2',
      children: '0',
      startdate: '4/25/2019',
      enddate: '4/26/2019'

    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    xml: true
  };

  rp(options)
      .then(function (repos) {
        var xmltest = repos;
        var parser = require('xml2json');
        var json = parser.toJson(xmltest);
        var jsonobj = JSON.parse(json);
        var neighhor = {};
        var neighborhoods = jsonobj['Hotwire']['MetaData']['HotelMetaData']['Neighborhoods']['Neighborhood'];
        jsonobj = jsonobj['Hotwire']['Result']['HotelResult'];
        console.log(neighborhoods);
        for (var i = 0; i < neighborhoods.length; i++) {
          neighhor[neighborhoods[i]["Id"]] = neighborhoods[i]['Name'];
        }
        var arr = [];
        for (var i = 0; i < jsonobj.length; i++) {
          var temp = [neighhor[String(jsonobj[i]['NeighborhoodId'])], jsonobj[i]['TotalPrice']];
          arr.push(temp)
        }
        res.render('index', { arr: arr});
      })
      .catch(function (err) {
        console.log(err);
        console.log('API Call Failed');
      });
});

module.exports = router;
