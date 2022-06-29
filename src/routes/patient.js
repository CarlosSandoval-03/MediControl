const express = require("express");
const router = express.Router();

const Patient = require("../public/Classes/Patient");

const pool = require("../database");
const e = require("connect-flash");

router.get("/", (req, res) => {
	res.render("user/patient/mainView");
});

router.get("/newTicket", (req, res) => {
	res.render("user/patient/ticket/generateTicket");
});

// Create a new Ticket
router.post("/createTicket", async (req, res) => {
	const { id_value, departament } = req.body;

	let priority;
	departament === "urgencias" ? (priority = 1) : (priority = 2);

	const newTicket = {
		id_doc_patient: id_value,
		departament: departament,
		priority_value: priority,
	};
	await pool.query("INSERT INTO tickets set ?", [newTicket]);
	res.send("Ticket Created");
});

module.exports = router;
