const getPatientWithId = async (id, pool) => {
	const patient = await pool.query("SELECT * FROM patients WHERE id_doc=?", [
		id,
	]);

	let exists = patient.length !== 0;

	return exists;
};

const getTickets = async (documentValuePatient, pool) => {
	const tickets = await pool.query(
		"SELECT * FROM tickets WHERE id_doc_patient=?",
		[documentValuePatient]
	);

	return tickets;
};

module.exports = { getTickets, getPatientWithId };
