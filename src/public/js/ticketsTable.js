const Stack = require("../Structures/Implementations/Lineal/Stack");
const Ticket = require("../Classes/Ticket");

const saveData = (tickets) => {
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

module.exports = { saveData };
