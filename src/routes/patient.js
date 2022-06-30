const express = require("express");
const router = express.Router();
const { format } = require("fecha");

const {
	getTickets,
	saveDataTickets,
} = require("../Modules/PatientImplementation");

const {
	saveDataDoctors,
	getDoctorsWithDepartament,
	getDoctorWithUsername,
} = require("../Modules/DoctorImplementation");

const {
	getAllAppointmentsWithDoctor,
	saveDataAppointments,
	generateAllTimeSlots,
	generateValidHours,
} = require("../Modules/AppointmentQuerys");

const pool = require("../database");

router.get("/", async (req, res) => {
	const tickets = await getTickets("756.9728.0972.58", pool);

	const stackTickets = saveDataTickets(tickets);

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
	res.render("user/patient/appointment/firstForm");
});

router.post("/newAppointment", (req, res) => {
	res.redirect("/user/selectDoctor/?departament=" + req.body.departament);
});

router.get("/selectDoctor", async (req, res) => {
	const departamentDoctors = await getDoctorsWithDepartament(
		req.query.departament,
		pool
	);

	const listDoctors = saveDataDoctors(departamentDoctors);

	res.render("user/patient/appointment/secondForm", { listDoctors });
});

router.post("/selectDoctor", (req, res) => {
	res.redirect(
		"/user/selectHour/?doctor=" + req.body.doctor + "&date=" + req.body.date
	);
});

router.get("/selectHour", async (req, res) => {
	const doctor = req.query.doctor;
	const date = req.query.date;

	let doctorInfo = await getDoctorWithUsername(doctor, pool);
	doctorInfo = doctorInfo[0];

	const doctorAppointments = await getAllAppointmentsWithDoctor(doctor, pool);

	const appointmentsDaySelected = doctorAppointments.filter((appointment) => {
		return format(appointment.start_time, "YYYY-MM-DD") === date;
	});

	const AVLAppointments = saveDataAppointments(appointmentsDaySelected);

	const queueHours = generateAllTimeSlots();
	const listHoursFiltered = generateValidHours(AVLAppointments, queueHours);

	res.render("user/patient/appointment/createAppointment", {
		doctorInfo,
		listHoursFiltered,
	});
});

router.post("/createAppointment", (req, res) => {
	console.log(req.body);
	res.redirect("/user/");
});

module.exports = router;
