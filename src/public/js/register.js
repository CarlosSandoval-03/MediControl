const datePicker = document.getElementById("birt_date_picker");

let maxDateValid = new Date().toISOString().split("T")[0];

datePicker.setAttribute("max", maxDateValid);
