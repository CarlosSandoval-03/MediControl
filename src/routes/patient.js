const express = require("express");
const router = express.Router();

const { getTickets } = require("../Modules/crudTickets");
const { saveData } = require("../public/js/ticketsTable");

const pool = require("../database");

router.get("/", async (req, res) => {
	const tickets = await getTickets("756.9728.0972.58", pool);

	const stackTickets = saveData(tickets);

	res.render("user/patient/mainView", { stack: stackTickets });
});

router.get("/newTicket", (req, res) => {
	res.render("user/patient/ticket/generateTicket");
});

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
	res.redirect("/user/");
});

router.get("/deleteTickets/:id", async (req, res) => {
	const { id } = req.params;
	await pool.query("DELETE FROM tickets WHERE id_ticket=?", [id]);
	res.redirect("/user/");
});

router.get("/newAppointment", (req, res) => {
	res.render("user/patient/appointment/generateAppointment");
});

router.post("/createAppointment", async (req, res) => {
	console.log(req.body);
	res.send("CREADO");
});

module.exports = router;
