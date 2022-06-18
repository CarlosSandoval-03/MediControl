class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

class LinkedList {
	static consoleErrorEmpty = () => {
		console.error("EMPTY LIST");
	};

	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	isEmpty() {
		return this.size === 0;
	}

	print() {
		let elements = [];
		if (!this.isEmpty()) {
			let node = this.head;

			for (let i = 0; i < this.size; i++) {
				elements.push(node.data);
				node = node.next;
			}
		}
		console.log(elements);
	}

	pushFront(data) {
		let node = new Node(data);
		node.next = this.head;
		this.head = node;

		if (this.tail === null) {
			this.tail = this.head;
		}
		this.size++;
	}

	topFront() {
		if (this.head !== null) {
			return this.head.data;
		}
		return undefined;
	}

	popFront() {
		if (this.isEmpty()) {
			LinkedList.consoleErrorEmpty();
			return;
		}
		this.head = this.head.next;

		if (this.head === null) {
			this.tail = null;
		}
		this.size--;
	}

	pushBack(data) {
		let node = new Node(data);
		if (this.tail === null) {
			this.tail = node;
			this.head = this.tail;
		} else {
			this.tail.next = node;
			node.prev = this.tail;
			this.tail = node;
		}
		this.size++;
	}

	topBack() {
		if (this.tail !== null) {
			return this.tail.data;
		}
		return undefined;
	}

	popBack() {
		if (this.isEmpty()) {
			LinkedList.consoleErrorEmpty();
			return;
		}

		if (this.head === this.tail) {
			this.head = null;
			this.tail = this.head;
		} else {
			this.tail = this.tail.prev;
		}
		this.size--;
	}

	findIndex(data) {
		let node = this.head;
		for (let pos = 0; pos < this.size; pos++) {
			if (node.data === data) {
				return pos;
			}
			node = node.next;
		}
		return -1;
	}

	exits(data) {
		return this.findIndex(data) !== -1;
	}

	getNode(index) {
		if (index >= this.size || index < 0) {
			console.error("INVALID POSITION");
			return undefined;
		}

		let node = this.head;
		for (let i = 0; i < index; i++) {
			node = node.next;
		}

		return node;
	}

	erase(data) {
		let node = this.head;

		for (let i = 0; i < this.size; i++) {
			if (node.data === data) {
				node.prev.next = node.next;
				node.next.prev = node.prev;
				this.size--;
				return;
			}
			node = node.next;
		}
		console.error("NOT EXISTING DATA");
	}

	remove(index) {
		if (index >= this.size || index < 0) {
			console.error("INVALID POSITION");
			return;
		}

		let node = this.head;
		for (let i = 0; i < index; i++) {
			node = node.next;
		}

		node.prev.next = node.next;
		node.next.prev = node.prev;
		this.size--;
	}

	addBefore(node, data) {
		let auxNode = new Node(data);
		auxNode.next = node;
		auxNode.prev = node.prev;
		node.prev = auxNode;

		if (auxNode.prev !== null) {
			auxNode.prev.next = auxNode;
		}

		if (this.head === node) {
			this.head = auxNode;
		}
	}

	addAfter(node, data) {
		let auxNode = new Node(data);
		auxNode.next = node.next;
		auxNode.prev = node;
		node.next = auxNode;

		if (auxNode.next !== null) {
			auxNode.next.prev = auxNode;
		}

		if (this.tail === node) {
			this.tail = auxNode;
		}
	}
}

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
