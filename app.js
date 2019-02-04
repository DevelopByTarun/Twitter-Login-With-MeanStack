const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Session Handling Code
app.use(session({

  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false,
      maxAge: 60000 * 6
  } // 6 min session

}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// route for twitter login
const twitterRequest = require("./routes/twitterRequest");
app.use("/auth", twitterRequest);

// create server
app.listen(9090|process.env.PORT, () => {
  console.log("Server Start....");
})

module.exports = app;
