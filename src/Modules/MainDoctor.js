const HashTable = require("../public/Structures/Implementations/Hash/HashTable");
const Ticket = require("../public/Classes/Patient");

const getTickets = async (pool) => {
	const tickets = await pool.query("SELECT * FROM tickets");
	return tickets;
};

const getPatients = async (pool) => {
	const patients = await pool.query("SELECT * FROM patients");
	return patients;
};

const getAllAppointments = async (usernameDoctor, pool) => {
	const appointments = await pool.query(
		"SELECT * FROM appointments WHERE user_doctor=?",
		[usernameDoctor]
	);

	return appointments;
};

const getPatientsFromAppointments = async (appointments, pool) => {
	if (appointments === []) return undefined;
	let patientsDocs = [];

	appointments.forEach((obj) => {
		if (!patientsDocs.includes(obj.id_doc_patient)) {
			patientsDocs.push(`\'${obj.id_doc_patient}\'`);
		}
	});

	if (patientsDocs.length === 0) return [];

	const patients = await pool.query(
		`SELECT * FROM patients WHERE id_doc IN (${patientsDocs.join(", ")});`
	);

	return patients;
};

const hashPatientsWithDoc = (patients) => {
	let hashTable = new HashTable(100);

	patients.forEach((patient) => {
		hashTable.insert(patient);
	});

	return hashTable;
};

module.exports = {
	getTickets,
	getPatients,
	hashPatientsWithDoc,
	getAllAppointments,
	getPatientsFromAppointments,
};
