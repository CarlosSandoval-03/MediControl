const Node = require("./Node");
const Queue = require("../../Implementations/Lineal/Queue");

class BST {
	static BASE_COMPARATOR = (a, b) => {
		if (a === null || b === null) {
			return undefined;
		}

		if (a < b) {
			return -1;
		} else if (a > b) {
			return 1;
		} else {
			return 0;
		}
	};

	constructor(comparator = BST.BASE_COMPARATOR) {
		this.root = null;
		this.compareTo = comparator;
	}

	isEmpty() {
		return this.root === null;
	}

	// Level Order
	print() {
		if (this.isEmpty()) {
			return "[]";
		}

		let queue = new Queue();
		let auxNode;

		let result = [];

		queue.enqueue(this.root);
		while (!queue.isEmpty()) {
			auxNode = queue.dequeue();
			result.push(auxNode.data);

			if (auxNode.left !== null) {
				queue.enqueue(auxNode.left);
			}
			if (auxNode.right !== null) {
				queue.enqueue(auxNode.right);
			}
		}
		return `[${result.join(", ")}]`;
	}

	insert(data) {
		this.root = this._insertNode(data, this.root);
	}

	_insertNode(data, node) {
		if (node === null) {
			return new Node(data);
		}

		let compareResult = this.compareTo(data, node.data);

		if (compareResult < 0) {
			node.left = this._insertNode(data, node.left);
		} else if (compareResult > 0) {
			node.right = this._insertNode(data, node.right);
		}
		return node;
	}

	contains(data) {
		return this._containsNode(data, this.root);
	}

	_containsNode(data, node) {
		if (node === null) {
			return false;
		}

		let compareResult = this.compareTo(data, node.data);
		if (compareResult < 0) {
			return this._containsNode(data, node.left);
		} else if (compareResult > 0) {
			return this._containsNode(data, node.right);
		} else if (compareResult === 0) {
			return true;
		}
		return false;
	}

	findMin() {
		if (this.isEmpty()) {
			throw new Error("UNDERFLOW");
		}

		let node = this.root;
		while (node.left !== null) {
			node = node.left;
		}
		return node;
	}

	findMax() {
		if (this.isEmpty()) {
			throw new Error("UNDERFLOW");
		}

		let node = this.root;
		while (node.right !== null) {
			node = node.right;
		}
		return node;
	}

	remove(data) {
		this.root = this._removeNode(data, this.root);
	}

	_removeNode(data, node) {
		if (node === null) {
			return null;
		}

		let compareResult = this.compareTo(data, node.data);
		if (compareResult < 0) {
			node.left = this._removeNode(data, node.left);
		} else if (compareResult > 0) {
			node.right = this._removeNode(data, node.right);
		} else {
			let otherNode = node;
			if (otherNode.right === null) {
				node = otherNode.left;
			} else if (otherNode.left === null) {
				node = otherNode.right;
			} else {
				let auxNode = node.left,
					flag = false,
					auxNode2 = auxNode;
				while (auxNode.right !== null) {
					auxNode = auxNode.right;

					flag = true;
				}
				node.data = auxNode.data;
				otherNode = auxNode;

				if (flag) {
					auxNode2.right = auxNode.left;
				} else {
					node.left = auxNode.left;
				}
			}
		}
		return node;
	}

	height(node = this.root) {
		if (node === null) {
			return 0;
		}
		return 1 + Math.max(this.height(node.left), this.height(node.right));
	}

	makeEmpty() {
		this.root = null;
	}

	find(data) {
		if (data === this.root.data) {
			return this.root;
		}
		return this._findNode(data, this.root);
	}

	_findNode(data, node) {
		if (node === null) {
			return null;
		}

		let compareResult = this.compareTo(data, node.data);
		if (compareResult < 0) {
			return this._findNode(data, node.left);
		} else if (compareResult > 0) {
			return this._findNode(data, node.right);
		} else if (compareResult === 0) {
			return node;
		}
	}
}

module.exports = BST;
