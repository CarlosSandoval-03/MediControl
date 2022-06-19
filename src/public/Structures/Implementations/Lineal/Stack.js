// const LinealNode = require("./LinealNode");
const LinkedList = require("./LinkedList");

class Stack {
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

	push(data) {
		this.list.pushBack(data);
		this.updateSize();
	}

	top() {
		return this.list.topBack();
	}

	pop() {
		let auxValue = this.top();
		this.list.popBack();

		this.updateSize();

		return auxValue;
	}
}

module.exports = Stack;