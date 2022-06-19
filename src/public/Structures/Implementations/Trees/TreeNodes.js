class BSTNode {
	constructor(data, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

class AVLNode extends BSTNode {
	constructor(data, left = null, right = null) {
		super(data, left, right);
		this.height = 1;
	}
}

module.exports = { BSTNode, AVLNode };
