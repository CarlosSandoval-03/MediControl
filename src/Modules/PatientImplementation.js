const Stack = require("../public/Structures/Implementations/Lineal/Stack");
const Ticket = require("../public/Classes/Ticket");

const saveDataTickets = (tickets) => {
	let stack = new Stack();
	tickets.forEach((ticket) => {
		let data = {
			id: ticket.id_ticket,
			idPatient: ticket.id_doc_patient,
			dateCreation: ticket.date_creation,
			departament: ticket.departament,
			priorityValue: ticket.priority_value,
		};
		let ticketObject = new Ticket(data);

		stack.push(ticketObject);
	});
	return stack;
};

const getPatientWithId = async (id, pool) => {
	const patient = await pool.query("SELECT * FROM patients WHERE id_doc=?", [
		id,
	]);

	return patient;
};

const getTickets = async (documentValuePatient, pool) => {
	const tickets = await pool.query(
		"SELECT * FROM tickets WHERE id_doc_patient=?",
		[documentValuePatient]
	);

	return tickets;
};

module.exports = { getTickets, getPatientWithId, saveDataTickets };
