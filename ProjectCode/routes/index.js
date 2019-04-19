var express = require('express');
var router = express.Router();




// -------------------------------------------- START OAUTH CODE -----------------------------------------------------//
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const APIKEYS = require('../.idea/runConfigurations/api_key');

passport.use(new GoogleStrategy({
        clientID: APIKEYS.GOOGLE_AUTH_CLIENT,
        clientSecret: APIKEYS.GOOGLE_AUTH_SECRET,
        callbackURL: APIKEYS.GOOGLE_AUTH_CALLBACK
    },
    function(accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
});

// ---------------------------------------------- END OAUTH CODE -----------------------------------------------------//

router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
        res.send(req.user.id);
    } else {
        res.redirect("/login");
    }
});

router.get("/login", function(req, res) {
    res.render('login');
});


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/trip/:id', function(req, res, next) {
  const APIKEYS = require('../.idea/runConfigurations/api_key');

  var tripId = req.params['id'];
  
  res.render('map', { google_maps: APIKEYS.GOOGLE_MAPS});
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
