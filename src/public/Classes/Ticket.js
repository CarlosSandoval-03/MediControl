class Ticket {
	constructor({ id, idPatient, departament, priorityValue }) {
		this.id = id;
		this.documentPatient = idPatient;
		this.departament = departament;

		if (departament === "urgencias") {
			this.priorityValue = priorityValue;
		}
	}
}

module.exports = Ticket;
