class Graph {
	/** Reference: https://p5js.org/es/reference/#/p5.Vector/heading */
	static drawArrow = (
		init,
		end,
		color = GraphNode.STOKE_COLOR,
		weight = GraphNode.STOKE_WEIGHT
	) => {
		push();
		stroke(color);
		strokeWeight(weight);
		fill(color);
		translate(init.x, init.y);
		line(0, 0, end.x, end.y);
		rotate(end.heading());
		let arrowSize = 20;
		translate(end.mag() - arrowSize, 0);
		triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
		pop();
	};

	constructor(dataGraph) {
		this.patient = dataGraph.patient;
		this.links = [];

		this.nodes = [];
		this.template = {};

		for (let date in dataGraph) {
			if (date !== "patient") {
				let node = new GraphNode(date, dataGraph[date]);
				this.nodes.push(node);
				this.template[date] = {
					id_appointment: dataGraph[date].id_appointment,
					user_doctor: dataGraph[date].user_doctor,
					start_time: dataGraph[date].start_time,
					state_appointment: dataGraph[date].state_appointment,
					connections: [],
				};

				if (
					node.state_appointment === "cancelled" ||
					node.state_appointment === "finished"
				) {
					this.links.push(0);
				} else {
					this.links.push(1);
				}
			} else {
				let node = new GraphNode(date, false, dataGraph.patient);
				this.nodes.push(node);
				this.template[date] = {
					firts_name: node.firts_name,
					connections: [],
				};
			}
		}
		this.selecNode = this.nodes[0];
	}

	generateGraph(width, height) {
		let auxNodes = [];

		let i = 0;
		while (i < this.nodes.length) {
			let nodeProperties = {
				xPos: random(GraphNode.SIZE_NODE, width - GraphNode.SIZE_NODE),
				yPos: random(GraphNode.SIZE_NODE, height - GraphNode.SIZE_NODE),
				tag: this.nodes[i].date,
			};
			let isValidPosition = true;

			for (let k = 0; k < auxNodes.length; k++) {
				let actualNode = auxNodes[k];
				let distance = dist(
					nodeProperties.x,
					nodeProperties.y,
					actualNode.x,
					actualNode.y
				);

				if (distance < GraphNode.SIZE_NODE) {
					isValidPosition = false;
					break;
				}
			}

			if (isValidPosition) {
				auxNodes.push(nodeProperties);
			}

			i++;
		}
		this.buildGraph(auxNodes);
	}

	buildGraph(nodes) {
		for (let node of nodes) {
			this.template[node.tag].x = node.xPos;
			this.template[node.tag].y = node.yPos;
		}
		this.connect();
	}

	connect() {
		for (let i in this.nodes) {
			if (this.nodes[i].date !== "patient") {
				let date = this.nodes[i].date;
				this.template[date].connections = [];

				if (
					this.nodes[i].state_appointment !== "cancelled" &&
					this.nodes[i].state_appointment !== "finished"
				) {
					this.template[this.nodes[0].date].connections.push(date);
				}
			}
		}
	}

	selectedNode() {
		for (let appointment in this.template) {
			let node = createVector(
				this.template[appointment].x,
				this.template[appointment].y
			);

			if (dist(mouseX, mouseY, node.x, node.y) < GraphNode.SIZE_NODE / 2) {
				this.template[appointment].selected = undefined;

				if (mouseIsPressed === true) {
					for (let universeTemp of this.nodes) {
						if (universeTemp.date === appointment) {
							this.selecNode = universeTemp;
						}
					}
				}
			} else {
				setTimeout(() => {
					this.template[appointment].selected = false;
				}, 100);
			}
		}
	}

	drawConnect(node1, node2) {
		let init = createVector(this.template[node1].x, this.template[node1].y);
		let end = createVector(
			this.template[node2].x - init.x,
			this.template[node2].y - init.y
		);
		if (dist(mouseX, mouseY, init.x, init.y) < GraphNode.SIZE_NODE / 2) {
			Graph.drawArrow(init, end, GraphNode.STROKE_SELECTED_COLOR, 3);
			this.template[node2].selected = true;
		} else {
			Graph.drawArrow(init, end, GraphNode.STOKE_COLOR, 1);
			setTimeout(() => {
				this.template[node2].selected = false;
			}, 100);
		}
	}

	draw(stateCanvas) {
		if (stateCanvas) {
			this.selectedNode();

			for (let i in this.template) {
				let connections = this.template[i].connections;
				for (let connection of connections) {
					this.drawConnect(i, connection);
				}
			}
		}
		for (let nodeValue of this.nodes) {
			let node = this.template[nodeValue.date];

			if (node.selected == true) {
				GraphNode.draw(
					node.x,
					node.y,
					nodeValue.date.split("|")[1],
					GraphNode.NODE_SELECTED_COLOR
				);
			} else if (node.selected == false) {
				GraphNode.draw(node.x, node.y, nodeValue.date.split("|")[0]);
			} else if (node.selected == undefined) {
				GraphNode.draw(
					node.x,
					node.y,
					nodeValue.date,
					GraphNode.NODE_MAIN_SELECTED_COLOR
				);
			}
		}
	}
}
