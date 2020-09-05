const passport = require('passport');
const JWTstrategy = require("passport-jwt"),Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const dotenv = require('dotenv');

dotenv.config();

const Doctor = require('../models/doctors');

let opts = {
	jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken,
	secretOrKey: process.env.SECRET_KEY
}

passport.use(new JWTstrategy(opts, function(payload, done){
	User.findById(payload._id, function(err, doctor){
		if(err){ console.log('Err: ', err); return; }

		if(doctor){
			return done(null, doctor);
		}else{
			done(null, false);
		}
	});
}));

module.exports = passport;