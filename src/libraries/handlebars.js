const { format } = require("timeago.js");

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

module.exports = helpers;
