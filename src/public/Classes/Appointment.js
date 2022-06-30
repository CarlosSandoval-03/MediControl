const { format } = require("fecha");

class Appointment {
	constructor({ user_doctor, id_doc_patient, start_time }) {
		this._userDoctor = user_doctor;
		this._docPatient = id_doc_patient;
		this._startTime = start_time;
		this._endTime = undefined;
		this._description = "";
		this._state = "pending";
		this._cancellationReason = "";
	}

	getUserDoctor() {
		return this._userDoctor;
	}

	getDocumentPatient() {
		return this._docPatient;
	}

	getStartTime() {
		return format(this._startTime, "HH:mm");
	}

	getEndTime() {
		return format(this._endTime, "DD/MM/YYYY [at] HH:mm");
	}

	setEndTime(endDateTime) {
		this._endTime = endDateTime;
	}

	getDescription() {
		return this._description;
	}

	setDescription(description) {
		this._description = description;
	}

	getState() {
		return this._state;
	}

	setState(state) {
		if (
			state === "pending" ||
			state === "confirmed" ||
			state === "cancelled" ||
			state === "finished"
		) {
			this._state = state;
		}
	}

	getCancellationReason() {
		return this._cancellationReason;
	}

	setCancellationReason(cancellationReason) {
		this._cancellationReason = cancellationReason;
	}
}

module.exports = Appointment;
