class Ticket {
	constructor({ id, idPatient, dateCreation, department, priorityValue }) {
		this.id = id;
		this.idPatient = idPatient;
		this.dateCreation = dateCreation;
		this.department = department;
		this.priorityValue = priorityValue;
	}
}

module.exports = Ticket;
