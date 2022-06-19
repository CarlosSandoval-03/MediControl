const LinkedList = require("./LinkedList");

class Stack {
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

	push(data) {
		this.list.pushBack(data);
		this._updateSize();
	}

	top() {
		return this.list.topBack();
	}

	pop() {
		let auxValue = this.top();
		this.list.popBack();

		this._updateSize();

		return auxValue;
	}
}

module.exports = Stack;
