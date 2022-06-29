const getTickets = async (documentValuePatient, pool) => {
	const tickets = await pool.query(
		"SELECT * FROM tickets WHERE id_doc_patient=?",
		[documentValuePatient]
	);

	return tickets;
};

module.exports = getTickets;
