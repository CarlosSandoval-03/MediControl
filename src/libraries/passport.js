const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");

const helpers = require("../libraries/helpers");

passport.use(
	"local.login",
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, username, password, done) => {
			const patientRow = await pool.query(
				"SELECT * FROM patients WHERE username=?",
				[username]
			);

			const doctorRow = await pool.query(
				"SELECT * FROM doctors WHERE username=?",
				[username]
			);

			const rows = patientRow.length > 0 ? patientRow : doctorRow;

			if (rows.length > 0) {
				const user = rows[0];
				const isValid = await helpers.matchPassword(password, user.password);

				if (isValid) {
					done(null, user);
				} else {
					done(null, false);
				}
			} else {
				done(null, false);
			}
		}
	)
);

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

passport.use(
	"local.registerDoctor",
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, username, password, done) => {
			const departamentFormatted = req.body.departament
				.toLowerCase()
				.split(" ")
				.join("_");

			const newDoctor = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				username,
				password,
				email: req.body.email,
				department: departamentFormatted,
			};

			newDoctor.password = await helpers.encryptPassword(password);

			const log = await pool.query("INSERT INTO doctors SET ?", [newDoctor]);

			newDoctor.id = log.insertId;
			return done(null, newDoctor);
		}
	)
);

passport.serializeUser((user, done) => {
	const id = user.id_patient || user.id_doctor || user.id;
	done(null, id);
});

passport.deserializeUser(async (id, done) => {
	let rows = await pool.query("SELECT * FROM patients WHERE id_patient=?", [
		id,
	]);

	if (rows.length === 0) {
		rows = await pool.query("SELECT * FROM doctors WHERE id_doctor=?", [id]);
	}

	done(null, rows[0]);
});
