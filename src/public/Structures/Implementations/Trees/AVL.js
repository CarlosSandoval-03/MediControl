const BST = require("./BST");
const Node = require("./Node");

const Queue = require("../../Implementations/Lineal/Queue");

class AVL extends BST {
	constructor(comparator = BST.BASE_COMPARATOR) {
		super(comparator);
		// BST node is adapted to AVL node
		Node.prototype.height = 1;
	}

	height(node = this.root) {
		if (node === null) {
			return 0;
		}
		return node.height;
	}

	balanceFactor(node) {
		if (node === null) {
			return 0;
		}

		return this.height(node.left) - this.height(node.right);
	}

	verifyBalance() {
		let queue = new Queue();
		queue.enqueue(this.root);

		while (!queue.isEmpty()) {
			let node = queue.dequeue();
			if (Math.abs(this.balanceFactor(node)) > 1) {
				return false;
			}
			if (node.left !== null) {
				queue.enqueue(node.left);
			}
			if (node.right !== null) {
				queue.enqueue(node.right);
			}
		}
		return true;
	}

	rightRotate(node) {
		let auxNode = node.left;
		let auxNodeRight = auxNode.right;

		auxNode.right = node;
		node.left = auxNodeRight;

		node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
		auxNode.height =
			Math.max(this.height(auxNode.left), this.height(auxNode.right)) + 1;

		return auxNode;
	}

	leftRotate(node) {
		let auxNode = node.right;
		let auxNodeLeft = auxNode.left;

		auxNode.left = node;
		node.right = auxNodeLeft;

		node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
		auxNode.height =
			Math.max(this.height(auxNode.left), this.height(auxNode.right)) + 1;

		return auxNode;
	}

	_generalBalance() {
		let newTree = new AVL();

		let queue = new Queue();
		let node;

		queue.enqueue(this.root);
		while (!queue.isEmpty()) {
			node = queue.dequeue();
			if (node.left !== null) {
				queue.enqueue(node.left);
			}
			if (node.right !== null) {
				queue.enqueue(node.right);
			}
			newTree.insert(node.data);
		}

		this.root = newTree.root;
	}

	_insertNode(data, node) {
		node = super._insertNode(data, node);

		node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;

		// Balance the tree
		let balanceFactor = this.balanceFactor(node);

		if (balanceFactor > 1) {
			let auxComparation = this.compareTo(data, node.left.data);
			if (auxComparation < 0) {
				return this.rightRotate(node);
			} else if (auxComparation > 0) {
				node.left = this.leftRotate(node.left);
				return this.rightRotate(node);
			}
		}

		if (balanceFactor < -1) {
			let auxComparation = this.compareTo(data, node.right.data);
			if (auxComparation > 0) {
				return this.leftRotate(node);
			} else if (auxComparation < 0) {
				node.right = this.rightRotate(node.right);
				return this.leftRotate(node);
			}
		}

		return node;
	}

	insert(data) {
		super.insert(data);

		if (!this.verifyBalance()) {
			this._generalBalance();
		}
	}

	_removeNode(data, node) {
		node = super._removeNode(data, node);

		if (node === null) return node;

		node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;

		// Balance the tree
		let balanceFactor = this.balanceFactor(node);

		if (balanceFactor > 1) {
			if (this.balanceFactor(node.left) < 0) {
				node.left = this.leftRotate(node.left);
				return this.rightRotate(node);
			}
			return this.rightRotate(node);
		}

		if (balanceFactor < -1) {
			if (this.balanceFactor(node.right) > 0) {
				node.right = this.rightRotate(node.right);
				return this.leftRotate(node);
			}
			return this.leftRotate(node);
		}

		return node;
	}

	remove(data) {
		super.remove(data);

		if (!this.verifyBalance()) {
			this._generalBalance();
		}
	}

	printDates() {
		if (this.isEmpty()) {
			return "[]";
		}

		let queue = new Queue();
		let auxNode;

		let result = [];

		queue.enqueue(this.root);
		while (!queue.isEmpty()) {
			auxNode = queue.dequeue();
			result.push(auxNode.data.getStartTime());

			if (auxNode.left !== null) {
				queue.enqueue(auxNode.left);
			}
			if (auxNode.right !== null) {
				queue.enqueue(auxNode.right);
			}
		}
		return `[${result.join(", ")}]`;
	}
}

module.exports = AVL;
