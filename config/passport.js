var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User_model.js');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

module.exports = function(passport) {
	//--------------------------- serialize/deserialize -------------------------------------
	passport.serializeUser(function(user, done) {
	  done(null, user._id);
	});
 
	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});

//---------------------------- UserLogin -------------------------------------

	passport.use('login', new LocalStrategy(function(username, password, done) {
		process.nextTick(function() {
    	User.findOne({
    	  'username': username, 
    	}, function(err, user) {
      		if (err) {
        		return done(err);
      		}

      		if (!user) {
        		return done(null, false);
      		}

      		if (!bcrypt.compareSync(password, user.password)){
        		return done(null, false);
      		}
      		return done(null, user);
    		});
  		});
	}));

//------------------------------ User Registration -------------------------------------

	passport.use('signup', new LocalStrategy(function(username, password, done) {
  		process.nextTick(function() {
    	User.findOne({
    	  'username': username, 
    	}, function(err, user) {
      		if (err) {
        		return done(err);
      		}

      		if (user) {
        		return done(null, false);
      		}
      		else {
      			var hash = bcrypt.hashSync(password, salt);
      			var usernew = new User({
      				username : username,
      				password : hash,
      		//email : email,
      		//age : age
      			});
      			usernew.save(function(err){
      				if(err){
      					console.log(err);
      				}
      			});
      		}
      		return done(null, false, user);
    		});
  		});
	}));
}
