const AVL = require("../public/Structures/Implementations/Trees/AVL");
const Appointment = require("../public/Classes/Appointment");
const { format } = require("fecha");

const getAllAppointmentsWithDoctor = async (doctorUsername, pool) => {
	const appointments = await pool.query(
		"SELECT * FROM appointments WHERE user_doctor=? ORDER BY appointments.start_time ASC",
		[doctorUsername]
	);

	return appointments;
};

const saveDataAppointments = (appointments) => {
	let avl = new AVL((a, b) => {
		// The query gives them in ascending order, for this reason the new data (a) will always be less
		return -1;
	});

	appointments.forEach((appointment) => {
		let appointmentData = {
			user_doctor: appointment.user_doctor,
			id_doc_patient: appointment.id_doc_patient,
			start_time: appointment.start_time,
		};

		let appointmentObject = new Appointment(appointmentData);

		avl.insert(appointmentObject);
	});
	return avl;
};

module.exports = {
	getAllAppointmentsWithDoctor,
	saveDataAppointments,
};
