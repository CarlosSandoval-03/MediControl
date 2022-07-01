class HashTable {
	constructor(size) {
		this.size = size;
		this.elements = 0;
		this.list = [];

		for (let i = 0; i < size; i++) {
			this.list.push([]);
		}
	}

	updateTableSize() {
		let loadFactor = this.elements / this.size;

		if (loadFactor > 0.5) {
			let newList = [];
			this.size *= 2;
			for (let i = 0; i < this.size; i++) {
				newList.push([]);
			}

			for (let i of this.list) {
				for (let j of i) {
					let pos = this.hash(j);
					newList[pos].push(j);
				}
			}
			this.list = newList;
		}
	}

	hash(data) {
		let n = 0;
		for (let i = 0; i < 4; i++) {
			n += data.charCodeAt(i);
		}
		return n % this.size;
	}

	find(data) {
		let pos = this.hash(data);
		for (let i of this.list[pos]) {
			if (i === data) {
				return true;
			}
		}
		return false;
	}

	insert(data) {
		let pos = this.hash(data);
		this.list[pos].push(data);
		this.elements++;
		this.updateTableSize();
	}

	remove(data) {
		let pos = this.hash(data);
		while (data in this.list[pos]) {
			this.list[pos].splice(this.list[pos].indexOf(data), 1);
			this.elements--;
		}
	}
}
