const BinaryHeap = require("../Structures/Implementations/PriorityQueue/BinaryHeap");
const Appointment = require("./Appointment");

class Doctor {
	constructor(id, firstName, lastName, username, password, email, departament) {
		this._id = id;
		this._firstName = firstName;
		this._lastName = lastName;
		this._username = username;
		this._password = password;
		this._email = email;
		this._departament = departament;
		this._appointments = new BinaryHeap();
	}

	addAppointment({ patient, startDate }) {
		data = {
			idDoctor: this._id,
			idPatient: patient.id,
			date: startDate,
		};

		let appointment = new Appointment(data);
		this._appointments.insert(appointment);

		return appointment;
	}

	getAppointment() {
		return this._appointments.extractMax();
	}

	setEndTime(appointment, endDateTime) {
		appointment.setEndTime(endDateTime);
	}

	setDescription(appointment, description) {
		appointment.setDescription(description);
	}

	setState(appointment, state) {
		appointment.setState(state);
	}

	setCancellationReason(appointment, cancellationReason) {
		appointment.setCancellationReason(cancellationReason);
	}

	endAppointment(appointment, patient) {
		this.setState(appointment, "finished");
		patient.deleteAppointment();
	}

	getPatientDescription(patient) {
		return patient.getDescription();
	}

	setPatientDescription(patient, description) {
		patient.setDescription(description);
	}
}

module.exports = Doctor;