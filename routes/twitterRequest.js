var express = require("express");
var router = express.Router();
var logger = require("../database/logger");
var passportTwitter = require("./twitterAuthentication");

router.get("/twitter",
passportTwitter.authenticate("twitter", {scope: ["email"]}));

router.get("/twitter/callback",
passportTwitter.authenticate("twitter", {failureRedirect: "/"}),
function(request, response) {
    // Successful authentication
    logger.debug("Twitter Authentication Is Successfully Done");
    console.log("CallBACK CALL>>>>");
    response.redirect("http://localhost:9090/view/welcome.html");
});

module.exports = router;
