const Queue = require("../Structures/Implementations/Lineal/Queue");
const Appointment = require("./Appointment");

class Patient {
	constructor({
		id,
		firstName,
		lastName,
		birtDate,
		description,
		idValue,
		username,
		password,
		email,
		phone,
	}) {
		this._id = id;
		this._firstName = firstName;
		this._lastName = lastName;
		this._birtDate = birtDate;
		this._description = description;
		this._idValue = idValue;
		this._username = username;
		this._password = password;
		this._email = email;
		this._department = department;
		this._phone = phone;

		this._appointments = new Queue();
		this._tickets = new Queue();
	}

	getId() {
		return this._id;
	}

	getDescription() {
		return this._description;
	}

	setDescription(description) {
		this._description = description;
	}

	addAppointment({ doctor, startDate }) {
		data = {
			idDoctor: doctor.id,
			idPatient: this._id,
			date: startDate,
		};

		let appointment = new Appointment(data);
		this._appointments.enqueue(appointment);

		return appointment;
	}

	getAppointment() {
		return this._appointments.top();
	}

	deleteAppointment() {
		this._appointments.dequeue();
	}

	cancelAppointment(reason) {
		let appointment = this.getAppointment();
		if (reason === "") new Error("Reason is required");

		appointment.setState("cancelled");
		appointment.setCancellationReason(reason);

		return this.deleteAppointment();
	}
}

module.exports = Patient;
