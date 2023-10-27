require("dotenv").config();
let express = require("express");
let mongoose = require("mongoose");
let app = express();
let session = require("express-session");
const MongoStore = require("connect-mongo");
var findOrCreate = require("mongoose-findorcreate");
let passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
let User = require("./models/user");
let fs = require("fs");
const { v4: uuid } = require("uuid");
app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose
  .connect(process.env.mongoDB)
  .then((p) => {
    console.log("Puze MicroSoft Azure connected :)");
  })
  .catch((err) => console.error(err));
let getApi = require("./utils/middleware/getApi");
let isAuth = require("./utils/middleware/isAuth");
let runPy = require("./utils/runPy/runPy");
app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}....`);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// google auth starting from this line
app.use(
  session({
    secret: process.env.header, // Replace with a secure random string future
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 15, httpOnly: true },
    store: MongoStore.create({
      mongoUrl: process.env.mongoDB,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        {
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
// google auth ends here
// google auth routes start here
app.get(
  "/api/google/verify",

  (req, res, next) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated() === true) {
      return res.redirect("/");
    }
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
app.get(
  "/api/google/verified",
  (req, res, next) => {
    res.locals.userWant = req.session.whatUserWant || "/";
    next();
  },
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    const returnUrl = res.locals.userWant || "/";
    res.redirect(returnUrl);
  }
);

// google auth routes end here
app.get("/", (req, res) => {
  let isAuthenticated = false;
  if (req.user) isAuthenticated = true;
  console.log(req.user);
  res.render("home", { isAuthenticated });
});
app.get("/test_api", isAuth, (req, res) => {
  res.render("type_api");
});
app.get("/test_api/ub_analysis", isAuth, (req, res) => {
  res.render("test_api1");
});
app.get("/test_api/effi_recom", isAuth, (req, res) => {
  res.render("test_api2");
});
app.get("/company_login", (req, res) => {
  res.send("not a protected route :)");
});
app.get("/api_key", isAuth, (req, res) => {
  res.send("api key generated");
});
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(400).send("error");
    } else {
      res.redirect("/");
    }
  });
});
app.post("/test_api1", isAuth, async (req, res) => {
  let name = uuid();
  name += ".txt";
  await fs.writeFileSync(name, req.body.userId);
  let data = await runPy("python_function1.py", name);
  res.json(data);
});
app.post("/test_api2", isAuth, async (req, res) => {
  res.json("Type 2 api");
});
