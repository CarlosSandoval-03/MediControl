const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");

const session = require("express-session");
const mysqlStore = require("express-mysql-session");

const { database } = require("./keys");

const passport = require("passport");

// Initializations
const app = express();
const libPassport = require("./libraries/passport");

// Public
app.use(express.static(path.join(__dirname, "public")));

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

// Config a template engine - Handlebars
app.engine(
	".hbs",
	engine({
		defaultLayout: "main",
		layoutsDir: path.join(app.get("views"), "layouts"),
		partialsDir: path.join(app.get("views"), "partials"),
		extname: ".hbs",
		helpers: require("./libraries/handlebars"),
	})
);

app.set("view engine", ".hbs");

// Middlewares
app.use(
	session({
		secret: "userMedicontrol",
		resave: false,
		saveUninitialized: false,
		store: new mysqlStore(database),
	})
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require("./routes/index"));
app.use(require("./routes/authentication"));
app.use("/user", require("./routes/patient"));
app.use("/doctor", require("./routes/doctor"));

// Global variables
app.use((req, res, next) => {
	app.locals.user = req.user;
});

// Start Server
app.listen(app.get("port"), () => {
	console.log(`Server on port ${app.get("port")}`);
});
