class GraphNode {
	static SIZE_NODE = 50;

	static NODE_COLOR = "#FFFFFF";
	static TEXT_NODE_COLOR = "#000000";
	static INVERSE_FONT_SIZE = 5;
	static STOKE_COLOR = "#000000";
	static STROKE_WEIGTH = 2;

	static STROKE_SELECTED_COLOR = "#FF0000";
	static STROKE_SELECTED_WEIGTH = "#FF0000";
	static NODE_SELECTED_COLOR = "#D16AFF";
	static NODE_MAIN_SELECTED_COLOR = "#6600A1";
	static NODE_CLICKED_COLOR = "#FF8000";

	static LIMIT_CONNECTIONS = 6;

	static draw = (xPos, yPos, textValue = "", color = GraphNode.NODE_COLOR) => {
		textAlign(CENTER, CENTER);
		fill(color);
		ellipse(xPos, yPos, GraphNode.SIZE_NODE, GraphNode.SIZE_NODE);
		fill(GraphNode.TEXT_NODE_COLOR);
		textSize(GraphNode.SIZE_NODE / GraphNode.INVERSE_FONT_SIZE);
		text(textValue, xPos, yPos);
	};

	constructor(
		date,
		appointment = {
			id_appointment,
			user_doctor,
			start_time,
			state_appointment,
		},
		patient = undefined
	) {
		this.type = "date";
		this.date = date;
		if (appointment) {
			this.id_appointment = appointment.id_appointment;
			this.user_doctor = appointment.user_doctor;
			this.start_time = appointment.start_time;
			this.state_appointment = appointment.state_appointment;
		}

		if (patient) {
			this.firts_name = patient.firts_name;
			this.type = "patient";
		}
	}
}
