require("dotenv").config();
let express = require("express");
let mongoose = require("mongoose");
let app = express();
let session = require("express-session");
const MongoStore = require("connect-mongo");
var findOrCreate = require("mongoose-findorcreate");
let passport = require("passport");
let strategy = require("passport-local");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
let User = require("./models/user");
let fs = require("fs");
const { v4: uuid } = require("uuid");
let getApi = require("./utils/middleware/getApi");
let isAuth = require("./utils/middleware/isAuth");
let runPy = require("./utils/runPy/runPy");
let runPy2 = require("./utils/runPy/runPy2");
let isCom = require("./utils/middleware/isCom");
let arr = require("./utils/stats/arrayData");
let arr2 = require("./utils/stats/arrayData2");
let arr3 = require("./utils/stats/arrayData3");
let Key = require("./models/api");
mongoose
  .connect(process.env.mongoDB)
  .then((p) => {
    console.log("Pune MicroSoft Azure connected :)");
  })
  .catch((err) => console.error(err));
app.set("view engine", "ejs");
app.use(express.static("public"));
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
    cookie: { maxAge: 1000 * 60 * 30, httpOnly: true },
    // session 15 min
    store: MongoStore.create({
      mongoUrl: process.env.mongoDB,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new strategy(User.authenticate()));

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
  res.render("home", { isAuthenticated });
});
app.get("/test_api", isAuth, (req, res) => {
  let isAuthenticated = false;
  if (req.user) isAuthenticated = true;
  res.render("type_api", { isAuthenticated });
});
app.get("/test_api/ub_analysis", isAuth, (req, res) => {
  let isAuthenticated = false;
  if (req.user) isAuthenticated = true;
  res.render("test_api1", { isAuthenticated });
});
app.get("/test_api/effi_recom", isAuth, (req, res) => {
  let isAuthenticated = false;
  if (req.user) isAuthenticated = true;
  res.render("test_api2", { isAuthenticated });
});

app.get(
  "/company_login",
  isAuth,
  (req, res, next) => {
    let ans = false;
    if (req.user === undefined) {
      return next();
    }
    const propertyCount = Object.keys(req.user).length;
    console.log(propertyCount);
    if (propertyCount === 6) {
      let isAuthenticated = false;
      if (req.user) isAuthenticated = true;
      return res.render("company", { isAuthenticated });
    }
    next();
  },
  (req, res) => {
    let isAuthenticated = false;
    if (req.user) isAuthenticated = true;
    return res.render("login", { isAuthenticated });
  }
);
app.get("/company/json", isCom, async (req, res) => {
  try {
    let data = await runPy2("python_function3.py");
    res.json(data);
  } catch (err) {
    res.status(400).json("Something went wrong");
  }
});
app.get("/company/visual", isCom, async (req, res) => {
  try {
    // let data = await runPy2("python_function3.py");
    let isAuthenticated = false;
    if (req.user) isAuthenticated = true;
    await runPy2("visualize_gen_ev.py");
    res.render("visual", { isAuthenticated });
  } catch (err) {
    res.status(400).json("Something went wrong");
  }
});
app.get("/company/demand", isCom, async (req, res) => {
  try {
    // let data = await runPy2("python_function3.py");
    let isAuthenticated = false;
    if (req.user) isAuthenticated = true;
    await runPy2("demand_ev.py");
    res.render("demand", { isAuthenticated, arr });
  } catch (err) {
    res.status(400).json("Something went wrong");
  }
});
app.get("/company/cost", isCom, async (req, res) => {
  try {
    // let data = await runPy2("python_function3.py");
    let isAuthenticated = false;
    if (req.user) isAuthenticated = true;
    await runPy2("cost_efficiency.py");
    res.render("cost", { isAuthenticated, arr2 });
  } catch (err) {
    res.status(400).json("Something went wrong");
  }
});
app.get("/company/mapping", isCom, async (req, res) => {
  try {
    // let data = await runPy2("python_function3.py");
    let isAuthenticated = false;
    if (req.user) isAuthenticated = true;
    await runPy2("spatialmapping.py");
    res.render("mapping", { isAuthenticated });
  } catch (err) {
    res.status(400).json("Something went wrong");
  }
});
app.get("/api_key", isAuth, async (req, res) => {
  let whatIsKey = req.user.googleId || req.user.salt;
  let data = await Key.findOne({ id: whatIsKey });

  if (data) {
    return res.render("api_key_detail", { key: whatIsKey, x: data.count });
  }
  res.render("api_key");
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
  try {
    let name = uuid();
    name += ".txt";
    await fs.writeFileSync(name, req.body.userId);
    let data = await runPy("python_function1.py", name);
    res.json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});
app.post("/test_api2", isAuth, async (req, res) => {
  try {
    res.json(arr3[req.body.userId - 1]);
  } catch (err) {
    res.status(400).json(err);
  }
});
app.post("/api/generate", isAuth, async (req, res) => {
  try {
    console.log("Request to generate api key");

    let whatIsKey = req.user.googleId || req.user.salt;
    let _data = await Key.findOne({ id: whatIsKey });
    if (_data) {
      return res.status(300).redirect("/api_key");
    }
    let newKey = new Key({ api_key: whatIsKey, id: whatIsKey, count: 0 });
    let data = await newKey.save();
    res.status(300).redirect("/api_key");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.post(
  "/login",
  (req, res, next) => {
    res.locals.userWant = req.session.whatUserWant || "/company_login";
    next();
  },
  passport.authenticate("local", {
    failureRedirect: "/company_login",
  }),
  (req, res) => {
    console.log("login successful");
    return res.redirect(res.locals.userWant);
  }
);
// apis for users having api key

app.get("/api/test/behaviour", getApi, async (req, res) => {
  try {
    let userId = req.query.userId;
    if (userId <= 5 && userId >= 1) {
      let name = uuid();
      name += ".txt";
      await fs.writeFileSync(name, userId);
      let data = await runPy("python_function1.py", name);
      return res.status(200).json(data);
    }
    return res.status(400).send("Please enter valid userId between 1 to 5");
  } catch (err) {
    res.status(400).json(err);
  }
});
app.get("/api/test/efficiency", getApi, (req, res) => {
  try {
    let userId = req.query.userId;
    if (userId <= 5 && userId >= 1) {
      return res.json(arr3[userId - 1]);
    }
    return res.status(400).send("Please enter valid userId between 1 to 5");
  } catch (err) {
    res.status(400).json(err);
  }
});
app.get(
  "/api/use",
  isAuth,
  async (req, res, next) => {
    let whatIsKey = req.user.googleId || req.user.salt;
    let data = await Key.findOne({ id: whatIsKey });
    if (data) {
      next();
      // if user has api key then only bypass this middleware!!
      // other wise redirect to api_key page!!
    } else {
      res.status(300).redirect("/api_key");
    }
  },
  (req, res) => {
    res.render("how_to_use_api");
  }
);
