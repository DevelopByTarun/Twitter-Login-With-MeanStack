var passport = require("passport");
var TwitterStrategy = require("passport-twitter").Strategy;
var logger = require("../database/logger");

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:9090/auth/twitter/callback",
    profileFields: ["username", "email"]
},
function(accessToken, refreshToken, profile, done) {
    console.log("Call Back Call ",accessToken);
    process.nextTick(function() {
        console.log("Profile ",profile);
        logger.debug("******Inside Twitter Login User Profile******");
        logger.debug(profile);
        passport.serializeUser(function(user, done) {
            done(null, user);
        });
        passport.deserializeUser(function(user, done) {
            done(null, user);
        });
        var User = require("../database/socialLoginSchema");
        User.findOne({"userid": profile.id}, function(err, user) {
            if(err) {
                return done(err);
            }
            if(user) {
                return done(null, user);
            }
            else {
                var newUser = new User();
                newUser.userid = profile.id;
                newUser.password = profile.displayName;
                newUser.save(function(err) {
                    if(err) {
                        throw err;
                    }
                    else {
                        return done(null, newUser);
                    }
                });
            }
        });
    })
}));

module.exports = passport;
