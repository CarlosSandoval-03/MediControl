// Only Valid Dates
const dateInput = document.getElementById("appointment_date");
let minDateValid = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", minDateValid);

const saveLocalStorage = () => {
	const department = document.getElementById("dropdown-department").value;
	const date = document.getElementById("appointment_date").value;
	const doctor = document.getElementById("dropdown-doctor") || undefined;

	let data = {
		department,
		date,
		doctor: doctor ? doctor.value : undefined,
	};

	localStorage.setItem("baseData", JSON.stringify(data));
};

const getLocalStorage = async () => {
	let data = await JSON.parse(localStorage.getItem("baseData"));

	const department = document.getElementById("dropdown-department");
	const date = document.getElementById("appointment_date");

	department.value = data.department;
	department.style.pointerEvents = "none";
	department.style.cursor = "not-allowed";

	date.value = data.date;
	date.setAttribute("readonly", true);
};
