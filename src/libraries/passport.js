const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");

const helpers = require("../libraries/helpers");

passport.use(
	"local.register",
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, username, password, done) => {
			const newUser = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				birt_date: req.body.birt_date,
				id_doc: req.body.document,
				username,
				password,
				email: req.body.email,
			};

			newUser.password = await helpers.encryptPassword(password);

			const log = await pool.query("INSERT INTO patients SET ?", [newUser]);

			newUser.id = log.insertId;
			return done(null, newUser);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const rows = await pool.query("SELECT * FROM patients WHERE id_patient=?", [
		id,
	]);

	done(null, rows[0]);
});
