const express = require("express");
const router = express.Router();
const { format } = require("fecha");

const {
	getTickets,
	getPatientWithId,
	saveDataTickets,
	getAllAppointmentsWithId,
} = require("../Modules/PatientImplementation");

const {
	saveDataDoctors,
	getDoctorsWithDepartament,
	getDoctorWithUsername,
} = require("../Modules/DoctorImplementation");

const {
	getAllAppointmentsWithDoctor,
	generateAllTimeSlots,
	generateValidHours,
	saveDataAppointments,
} = require("../Modules/AppointmentQuerys");

const pool = require("../database");

// Main Route
router.get("/", async (req, res) => {
	const idPatient = "756.9728.0972.58";

	const tickets = await getTickets(idPatient, pool);
	const stackTickets = saveDataTickets(tickets);

	res.render("user/patient/mainView", {
		stack: stackTickets,
	});
});

router.get("/data/graph", async (req, res) => {
	const idPatient = "756.9728.0972.58";

	const appointmets = await getAllAppointmentsWithId(idPatient, pool);
	const patient = await getPatientWithId(idPatient, pool);

	const temp = patient[0];

	let data = {
		patient: {
			id_patient: temp.id_patient,
			first_name: temp.first_name,
			last_name: temp.last_name,
			birt_date: temp.birt_date,
			desc_patient: temp.desc_patient,
			id_doc: temp.id_doc,
			username: temp.username,
			password: temp.password,
			email: temp.email,
			phone: temp.phone,
		},
	};

	appointmets.forEach((appointmet) => {
		const date = new Date(appointmet.start_time).toISOString().split("T");
		data[`${date[0]}|${date[1].split(".")[0]}`] = {
			id_appointment: appointmet.id_appointment,
			user_doctor: appointmet.user_doctor,
			id_doc_patient: appointmet.id_doc_patient,
			start_time: appointmet.start_time,
			end_time: appointmet.end_time,
			description_appointment: appointmet.description_appointment,
			state_appointment: appointmet.state_appointment,
			cancellation_reason: appointmet.cancellation_reason,
		};
	});

	const jsonFile = JSON.stringify(data);

	res.json(jsonFile);
});

// Ticket
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

// Appointment
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

router.post("/createAppointment", async (req, res) => {
	let newAppointment = {
		user_doctor: req.body.doctor,
		id_doc_patient: req.body.id_value,
		start_time: req.body.date + " " + req.body.hour + ":00",
	};

	await pool.query("INSERT INTO appointments set ?", [newAppointment]);

	res.redirect("/user/");
});

router.get("/deleteAppointment/:id", async (req, res) => {
	const { id } = req.params;
	await pool.query("DELETE FROM appointments WHERE id_appointment=?", [id]);

	res.redirect("/user/");
});

router.get("/cancelAppointment/:id", async (req, res) => {
	const { id } = req.params;

	await pool.query(
		"UPDATE appointments SET state_appointment='cancelled' WHERE id_appointment=?",
		[id]
	);

	res.redirect("/user/");
});

module.exports = router;
