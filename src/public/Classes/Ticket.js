class Ticket {
	constructor({ id, idPatient, dateCreation, departament, priorityValue }) {
		this.id = id;
		this.idPatient = idPatient;
		this.dateCreation = dateCreation;
		this.departament = departament;
		this.priorityValue = priorityValue;
	}
}

module.exports = Ticket;
