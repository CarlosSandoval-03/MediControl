class HashTable {
	constructor(size) {
		this.size = size;
		this.elements = 0;
		this.list = [];

		for (let i = 0; i < this.size; i++) {
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
			n += data.id_doc.charCodeAt(i);
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

		while (this.list[pos].includes(data)) {
			this.list[pos].splice(this.list[pos].indexOf(data), 1);
		}
	}

	print() {
		let string = "";

		for (let i = 0; i < this.size; i++) {
			if (this.list[i].length === 0) {
				string += "[]";
			} else {
				string += `['${this.list[i].join("', '")}']`;
			}

			if (i < this.size - 1) {
				string += ", ";
			}
		}

		return `{${string}}`;
	}
}

module.exports = HashTable;
