const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");

// Initializations
const app = express();

// Global Variables
app.use((req, res, next) => {
	next();
});

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
		helpers: require("./lib/handlebars"),
	})
);

app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(require("./routes/index"));
app.use(require("./routes/authentication"));
app.use("/user", require("./routes/patient"));
app.use("/user", require("./routes/doctor"));

// Start Server
app.listen(app.get("port"), () => {
	console.log(`Server on port ${app.get("port")}`);
});
