class BinaryHeap {
	static BASE_COMPARATOR(a, b) {
		return a - b;
	}

	constructor(comparator = BinaryHeap.BASE_COMPARATOR, limit = Infinity) {
		this.comparatorTo = comparator;
		this.heap = [];
		this.limit = limit;
	}

	// Only read
	get size() {
		return this.heap.length;
	}

	parent(index) {
		return Math.floor(index / 2);
	}

	left(index) {
		return Math.floor(index * 2);
	}

	right(index) {
		return Math.floor(index * 2 + 1);
	}

	_siftUp(index) {
		while (
			index > 1 &&
			this.comparatorTo(this.heap[this.parent(index)], this.heap[index]) < 0
		) {
			this._swap(this.parent(index), index);
			index = this.parent(index);
		}
	}

	_siftDown(index) {
		let maxIndex = index;

		const left = this.left(index);

		if (
			left <= this.heap.length &&
			this.comparatorTo(this.heap[left], this.heap[maxIndex]) > 0
		) {
			maxIndex = left;
		}

		const right = this.right(index);
		if (
			right <= this.heap.length &&
			this.comparatorTo(this.heap[right], this.heap[maxIndex]) > 0
		) {
			maxIndex = right;
		}

		if (index !== maxIndex) {
			this._swap(index, maxIndex);
			this._siftDown(maxIndex);
		}
	}

	_swap(i, j) {
		const temp = this.heap[i];
		this.heap[i] = this.heap[j];
		this.heap[j] = temp;
	}

	insert(data) {
		if (this.heap.length === this.limit) {
			throw new Error("HEAP IS FULL");
		}

		this.heap.push(data);
		this._siftUp(this.heap.length - 1);
	}

	extractMax() {
		if (this.heap.length === 0) {
			throw new Error("HEAP IS EMPTY");
		}

		const max = this.heap[1];
		this._swap(1, this.heap.length - 1);
		this.heap.splice(this.heap.length - 1, 1);
		this._siftDown(1);
		return max;
	}

	remove(index) {
		if (index > this.heap.length - 1) {
			throw new Error("INVALID POSITION");
		}

		this.heap[index] = Infinity;
		this._siftUp(index);
		return this.extractMax();
	}

	changePriority(index, newPriority) {
		if (index > this.heap.length) {
			throw new Error("INVALID POSITION");
		}

		const oldPriority = this.heap[index];
		this.heap[index] = newPriority;

		if (this.comparatorTo(newPriority, oldPriority) > 0) {
			this._siftUp(index);
		} else {
			this._siftDown(index);
		}
	}

	print() {
		return `[${this.heap.toString().split(",").join(", ")}]`;
	}
}

module.exports = BinaryHeap;
