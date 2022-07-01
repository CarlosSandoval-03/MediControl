const express = require("express");
const router = express.Router();

const passport = require("passport");

router.get("/register", (req, res) => {
	res.render("auth/register");
});

router.post(
	"/register",
	passport.authenticate("local.register", {
		successRedirect: "/user",
		failureRedirect: "/register",
	})
);

router.get("/login", (req, res) => {
	res.render("auth/login");
});

router.post("/login", (req, res) => {
	console.log(req.body);
	res.send("ok");
});

router.get("/profile", (req, res) => {
	// res.redirect("/user");
	res.send("REGISTRADO");
});

module.exports = router;
