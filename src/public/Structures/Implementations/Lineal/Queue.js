// const LinealNode = require("./LinealNode");
const LinkedList = require("./LinkedList");

class Queue {
	constructor() {
		this.list = new LinkedList();
		this.size = this.list.size;
	}

	print() {
		this.list.print();
	}

	isEmpty() {
		return this.list.isEmpty();
	}

	updateSize() {
		this.size = this.list.size;
	}

	enqueue(data) {
		this.list.pushBack(data);
		this.updateSize();
	}

	top() {
		return this.list.topFront();
	}

	dequeue() {
		let auxValue = this.top();
		this.list.popFront();

		this.updateSize();

		return auxValue;
	}
}

module.exports = Queue;
