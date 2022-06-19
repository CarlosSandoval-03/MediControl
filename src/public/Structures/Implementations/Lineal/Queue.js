const LinkedList = require("./LinkedList");

class Queue {
	constructor() {
		this.list = new LinkedList();
		this.size = this.list.size;
	}

	print() {
		return this.list.print();
	}

	isEmpty() {
		return this.list.isEmpty();
	}

	_updateSize() {
		this.size = this.list.size;
	}

	enqueue(data) {
		this.list.pushBack(data);
		this._updateSize();
	}

	top() {
		return this.list.topFront();
	}

	dequeue() {
		let auxValue = this.top();
		this.list.popFront();

		this._updateSize();

		return auxValue;
	}
}

module.exports = Queue;
