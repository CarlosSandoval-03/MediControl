// Only Valid Dates
const dateInput = document.getElementById("appointment_date");
let minDateValid = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", minDateValid);

const saveLocalStorage = () => {
	const id = document.getElementById("id_value_appointment").value;
	const departament = document.getElementById("dropdown-departament").value;
	const date = document.getElementById("appointment_date").value;
	const doctor = document.getElementById("dropdown-doctor") || undefined;

	let data = {
		id,
		departament,
		date,
		doctor: doctor ? doctor.value : undefined,
	};

	localStorage.setItem("baseData", JSON.stringify(data));
};

const getLocalStorage = async () => {
	let data = await JSON.parse(localStorage.getItem("baseData"));

	const id = document.getElementById("id_value_appointment");
	const departament = document.getElementById("dropdown-departament");
	const date = document.getElementById("appointment_date");

	id.value = data.id;
	id.setAttribute("readonly", true);

	departament.value = data.departament;
	departament.style.pointerEvents = "none";
	departament.style.cursor = "not-allowed";

	date.value = data.date;
	date.setAttribute("readonly", true);
};
