const cancelButton = document.getElementById("cancel-button");
const deleteButton = document.getElementById("delete-button");

cancelButton.addEventListener("click", async () => {
	if (graph.selecNode.id_appointment === undefined) {
		console.error("this");
	}

	await fetch(`/user/cancelAppointment/${graph.selecNode.id_appointment}`).then(
		() => {
			location.reload();
		}
	);
});

deleteButton.addEventListener("click", async () => {
	if (graph.selecNode.id_appointment === undefined) {
		console.error("this");
	}

	await fetch(`/user/deleteAppointment/${graph.selecNode.id_appointment}`).then(
		() => {
			location.reload();
		}
	);
});
