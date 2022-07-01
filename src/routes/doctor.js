const express = require("express");
const router = express.Router();
const { format } = require("fecha");

const {
	getTickets,
	hashPatientsWithDoc,
	getAllAppointments,
	getPatientsFromAppointments,
} = require("../Modules/MainDoctor");

const { saveDataTickets } = require("../Modules/PatientImplementation");

const pool = require("../database");

router.get("/", async (req, res) => {
	if (req.user) {
		if (req.user.department === undefined) {
			res.redirect("/user/");
		} else {
			const usernameDoctor = req.user.username;

			const tickets = await getTickets(pool);
			const stackTickets = saveDataTickets(tickets);

			const appointments = await getAllAppointments(usernameDoctor, pool);
			const patientsData = await getPatientsFromAppointments(
				appointments,
				pool
			);
			const hashPatients = hashPatientsWithDoc(patientsData);

			res.render("user/doctor/mainView", {
				stack: stackTickets,
				hash: hashPatients,
				firstName: req.user.first_name,
				lastName: req.user.last_name,
			});
		}
	} else {
		res.redirect("/login/");
	}
});

router.get("/endAppointment/:id", async (req, res) => {
	const { id } = req.params;
	await pool.query("DELETE FROM appointments WHERE id_doc_patient=?", [id]);

	res.redirect("/doctor/");
});

module.exports = router;
