class Appointment {
	constructor(idDoctor, idPatient, date) {
		this._idDoctor = idDoctor;
		this._idPatient = idPatient;
		this._startTime = date;
		this._endTime = undefined;
		this._description = "";
		this._state = "pending";
		this._cancellationReason = "";
	}

	getIdDoctor() {
		return this._idDoctor;
	}

	getIdPatient() {
		return this._idPatient;
	}

	getStartTime() {
		return this._startTime;
	}

	getEndTime() {
		return this._endTime;
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
