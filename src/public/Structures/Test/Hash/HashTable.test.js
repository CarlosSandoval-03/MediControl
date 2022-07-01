const HashTable = require("../../Implementations/Hash/HashTable");

let hashTable = new HashTable(12);

test("General test", () => {
	hashTable.insert("Lucia");
	hashTable.insert("Jaime");
	hashTable.insert("Alba");
	hashTable.insert("Pepe");
	hashTable.insert("Jairo");
	hashTable.insert("Luciana");
	hashTable.insert("Lucia");
	hashTable.insert("Jaime");
	hashTable.insert("Alba");
	hashTable.insert("Pepe");
	hashTable.insert("Jairo");
	hashTable.insert("Luciana");

	expect(hashTable.print()).toBe(
		"{[], ['Jaime', 'Jaime'], [], [], [], [], ['Jairo', 'Jairo'], [], ['Alba', 'Alba'], [], ['Pepe', 'Pepe'], [], [], ['Lucia', 'Luciana', 'Lucia', 'Luciana'], [], [], [], [], [], [], [], [], [], []}"
	);

	hashTable.insert("Simon");

	expect(hashTable.find("Lucia")).toBeTruthy();
	expect(hashTable.find("Jaime")).toBeTruthy();
	expect(hashTable.find("Lucas")).toBeFalsy();

	expect(hashTable.print()).toBe(
		"{[], ['Jaime', 'Jaime'], [], [], [], [], ['Jairo', 'Jairo'], [], [], [], ['Pepe', 'Pepe'], [], [], ['Lucia', 'Luciana', 'Lucia', 'Luciana'], [], [], [], [], [], [], [], [], [], [], ['Simon'], [], [], [], [], [], [], [], ['Alba', 'Alba'], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []}"
	);

	hashTable.remove("Lucia");

	expect(hashTable.print()).toBe(
		"{[], ['Jaime', 'Jaime'], [], [], [], [], ['Jairo', 'Jairo'], [], [], [], ['Pepe', 'Pepe'], [], [], ['Luciana', 'Luciana'], [], [], [], [], [], [], [], [], [], [], ['Simon'], [], [], [], [], [], [], [], ['Alba', 'Alba'], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []}"
	);
});
