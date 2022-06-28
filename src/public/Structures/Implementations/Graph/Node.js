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

	static draw = (xPos, yPos, name = "", color = Universe.NODE_COLOR) => {
		textAlign(CENTER, CENTER);
		fill(color);
		ellipse(xPos, yPos, Universe.SIZE_NODE, Universe.SIZE_NODE);
		fill(Universe.TEXT_NODE_COLOR);
		textSize(Universe.SIZE_NODE / Universe.INVERSE_FONT_SIZE);
		text(name, xPos, yPos);
	};
}

module.exports = GraphNode;
