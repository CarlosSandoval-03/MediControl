const AVL = require("../public/Structures/Implementations/Trees/AVL");
const Queue = require("../public/Structures/Implementations/Lineal/Queue");
const LinkedList = require("../public/Structures/Implementations/Lineal/LinkedList");
const Appointment = require("../public/Classes/Appointment");

const getAllAppointmentsWithDoctor = async (doctorUsername, pool) => {
	const appointments = await pool.query(
		`SELECT *
		FROM appointments WHERE user_doctor=? ORDER BY appointments.start_time ASC`,
		[doctorUsername]
	);
	return appointments;
};

const saveDataAppointments = (appointments) => {
	let avl = new AVL((a, b) => {
		return a < b ? -1 : a >= b ? 1 : 0;
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

const HOURS_WORKING = 10;
const APPOINTMENTS_PER_MINUTE = 3;

const generateAllTimeSlots = () => {
	let queue = new Queue();

	let currentTime = [6, 0];

	for (let i = 0; i < HOURS_WORKING * APPOINTMENTS_PER_MINUTE; i++) {
		let hour = currentTime[0] < 10 ? `0${currentTime[0]}` : `${currentTime[0]}`;
		let minute =
			currentTime[1] < 10 ? `0${currentTime[1]}` : `${currentTime[1]}`;

		let time = `${hour}:${minute}`;

		queue.enqueue(time);

		currentTime[1] = (currentTime[1] + 20) % 60;
		if (currentTime[1] === 0 && i > 1) {
			currentTime[0] += 1 % 24;
		}
	}

	return queue;
};

const generateValidHours = (avl, queue) => {
	let validHours = new LinkedList();
	const size = queue.size;

	for (let i = 0; i < size; i++) {
		const hour = queue.dequeue();

		if (!avl.printDates().includes(hour)) {
			validHours.pushBack(hour);
		}
	}
	return validHours;
};

const getAllValidDepartments = async (pool) => {
	const departments = await pool.query(
		`SELECT department FROM doctors GROUP BY department`
	);

	return departments;
};

module.exports = {
	getAllAppointmentsWithDoctor,
	saveDataAppointments,
	generateAllTimeSlots,
	generateValidHours,
	getAllValidDepartments,
};
