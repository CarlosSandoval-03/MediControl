const { format } = require("timeago.js");
const Queue = require("../public/Structures/Implementations/Lineal/Queue");
const LinkedList = require("../public/Structures/Implementations/Lineal/LinkedList");

const helpers = {};

helpers.timeagoFormat = (date) => {
	return format(date, "es_CO");
};

helpers.capitalizeText = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

helpers.renderTableTickets = (stackTickets) => {
	let content = "";

	let size = stackTickets.size;

	for (let i = 0; i < size; i++) {
		let ticket = stackTickets.pop();

		let table = `<tr style="background: #262a38;">
		<td style="color: rgb(255,255,255);">
			${ticket.id}
		</td>
		<td style="color: rgb(255,255,255);">
			${helpers.timeagoFormat(ticket.dateCreation)}
		</td>
		<td style="color: rgb(255,255,255);">
			${helpers.capitalizeText(ticket.departament)}
		</td>
		<td class="text-center align-middle" style="max-height: 60px;height: 60px;">
			<a class="btn btn-flat accent btnNoBorders checkboxHover" style="margin-bottom: 5px;" href="/user/deleteTickets/${
				ticket.id
			}">
				<i class="fas fa-trash btnNoBorders" style="color: #DC3545;"></i>
			</a>
		</td>
	</tr>`;

		content += table + " ";
	}

	return content;
};

helpers.createOptionsDoctors = (listDoctors) => {
	let size = listDoctors.size;
	let DoctorsDepartament = new Queue();

	for (let i = 0; i < size; i++) {
		let doctor = listDoctors.topBack();

		DoctorsDepartament.enqueue(doctor);

		listDoctors.popBack();
	}

	let content = "";
	size = DoctorsDepartament.size;

	for (let i = 0; i < size; i++) {
		let doctor = DoctorsDepartament.dequeue();
		let option = `<option value="${doctor.getUsername().trim()}">${doctor
			.getName()
			.trim()}</option>`;
		content += option + " ";
	}
	return content;
};

helpers.createHourSlots = (listHours) => {
	let content = "";
	let size = listHours.size;

	for (let i = 0; i < size; i++) {
		let hour = listHours.topFront();
		let option = `<option value="${hour}">${hour}</option>`;
		content += option + " ";

		listHours.popFront();
	}
	return content;
};

helpers.loadAppointmentFormScript = () => {
	return `<script src="/js/appointment.js"></script>`;
};

helpers.getLocalStorage = () => {
	return `${helpers.loadAppointmentFormScript()}
	<script>getLocalStorage()</script>`;
};

module.exports = helpers;
