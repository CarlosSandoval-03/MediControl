const express = require("express");
const router = express.Router();

const passport = require("passport");

router.get("/register", (req, res) => {
	if (req.user) {
		res.redirect("/user/");
	}

	res.render("auth/register");
});

router.post(
	"/register",
	passport.authenticate("local.register", {
		successRedirect: "/user/",
		failureRedirect: "/register/",
	})
);

router.get("/doctorRegister", (req, res) => {
	if (req.user) {
		res.redirect("/user/");
	}

	res.render("auth/registerDoctor");
});

router.post(
	"/doctorRegister",
	passport.authenticate("local.registerDoctor", {
		successRedirect: "/doctor/",
		failureRedirect: "/doctorRegister/",
	})
);

router.get("/login", (req, res) => {
	if (req.user) {
		res.redirect("/user/");
	}

	res.render("auth/login");
});

router.post("/login", (req, res, next) => {
	passport.authenticate("local.login", {
		successRedirect: "/user/",
		failureRedirect: "/login/",
	})(req, res, next);
});

router.get("/logout", (req, res) => {
	req.logout(req.user, (err) => {
		if (err) return next(err);
		res.redirect("/login/");
	});
});

module.exports = router;
