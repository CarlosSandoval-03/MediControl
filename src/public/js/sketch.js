let stateFocus = true;

let graph,
	jsonValue,
	count = 1;

function preload() {
	const URL = "/user/data/graph";

	loadJSON(URL, (data) => {
		jsonValue = data;
		graph = new Graph(JSON.parse(jsonValue));
		graph.generateGraph(windowWidth, windowHeight / 1.2);
	});
}

function setup() {
	// Put Canva in Main Container
	let canva = createCanvas(windowWidth, windowHeight / 1.2);
	canva.id("canvasView");
	select("#mainView").child(canva);
}

function draw() {
	background(225);
	graph.draw(stateFocus);

	if (mouseIsPressed === true || count > 0) {
		let info = document.getElementById("info-universe");
		info.innerHTML = `Cita Seleccionada: ${
			graph.selecNode.id_appointment ?? "No seleccionada"
		}`;
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight / 1.2);
}
