const express = require("express");
const router = express.Router();
const { format } = require("fecha");

const {
	getTickets,
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
	getAllValidDepartaments,
} = require("../Modules/AppointmentQuerys");

const pool = require("../database");

// Main Route
router.get("/", async (req, res) => {
	if (req.user) {
		const idPatient = req.user.id_patient;
		if (idPatient === undefined) {
			res.redirect("/doctor");
		} else {
			const tickets = await getTickets(req.user.id_doc, pool);
			const stackTickets = saveDataTickets(tickets);

			res.render("user/patient/mainView", {
				stack: stackTickets,
				firstName: req.user.first_name,
				lastName: req.user.last_name,
			});
		}
	} else {
		res.redirect("/login/");
	}
});

router.get("/data/graph", async (req, res) => {
	const idPatient = req.user.id_doc;

	const appointmets = await getAllAppointmentsWithId(idPatient, pool);

	let data = {
		patient: {
			id_patient: req.user.id_patient,
			first_name: req.user.first_name,
			last_name: req.user.last_name,
			birt_date: req.user.birt_date,
			desc_patient: req.user.desc_patient,
			id_doc: req.user.id_doc,
			username: req.user.username,
			password: req.user.password,
			email: req.user.email,
			phone: req.user.phone,
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
	const { departament } = req.body;

	let priority;
	departament === "urgencias" ? (priority = 1) : (priority = 2);

	const newTicket = {
		id_doc_patient: req.user.id_doc,
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
router.get("/newAppointment", async (req, res) => {
	const departamentObject = await getAllValidDepartaments(pool);

	let departaments = [];
	departamentObject.forEach((departament) => {
		departaments.push(departament.department);
	});

	res.render("user/patient/appointment/firstForm", { departaments });
});

router.post("/newAppointment", (req, res) => {
	res.redirect(
		"/user/selectDoctor/?departament=" +
			req.body.departament +
			"&date=" +
			req.body.date
	);
});

router.get("/selectDoctor", async (req, res) => {
	const departamentDoctors = await getDoctorsWithDepartament(
		req.query.departament,
		pool
	);

	const listDoctors = saveDataDoctors(departamentDoctors);

	res.render("user/patient/appointment/secondForm", {
		listDoctors,
		dep: req.query.departament,
	});
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
		id_doc_patient: req.user.id_doc,
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
