const { format } = require("timeago.js");

const helpers = {};

helpers.timeagoFormat = (date) => {
	return format(date, "es_CO");
};

helpers.capitalizeText = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = helpers;
