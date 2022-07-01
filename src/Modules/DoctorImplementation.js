const LinkedList = require("../public/Structures/Implementations/Lineal/LinkedList");
const Doctor = require("../public/Classes/Doctor");

const getAllDoctors = async (pool) => {
	const doctors = await pool.query("SELECT * FROM doctors");

	return doctors;
};

const getDoctorsWithDepartment = async (department, pool) => {
	const doctors = await pool.query("SELECT * FROM doctors WHERE department=?", [
		department,
	]);

	return doctors;
};

const getDoctorWithUsername = async (username, pool) => {
	const doctor = await pool.query("SELECT * FROM doctors WHERE username=?", [
		username,
	]);

	return doctor;
};

const saveDataDoctors = (doctors) => {
	let list = new LinkedList();

	doctors.forEach((doctor) => {
		let doctorData = {
			id: doctor.id_doctor,
			firstName: doctor.first_name,
			lastName: doctor.last_name,
			username: doctor.username,
			password: doctor.password,
			email: doctor.email,
			department: doctor.department,
		};
		let doctorObject = new Doctor(doctorData);

		list.pushBack(doctorObject);
	});
	return list;
};

module.exports = {
	getDoctorsWithDepartment,
	getAllDoctors,
	saveDataDoctors,
	getDoctorWithUsername,
};
