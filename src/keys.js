// Handle environment variables in non-production environments
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

module.exports = {
	database: {
		host: process.env.HOST_DATABASE,
		user: process.env.USER_DATABASE,
		password: process.env.PASSWORD_DATABASE,
		database: process.env.NAME_DATABASE,
	},
};
