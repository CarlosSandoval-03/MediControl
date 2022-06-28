const BST = require("../../Implementations/Trees/BST");

let tree = new BST();

test("IsEmpty", () => {
	expect(tree.isEmpty()).toBeTruthy();
	expect(tree.height()).toBe(0);
});

test("Insert Elements", () => {
	tree.insert(120);
	expect(tree.root.data).toBe(120);
	expect(tree.height()).toBe(1);

	tree.insert(87);
	tree.insert(43);
	expect(tree.height()).toBe(3);

	tree.insert(65);
	expect(tree.height()).toBe(4);

	tree.insert(140);
	tree.insert(99);
	tree.insert(130);
	tree.insert(22);
	tree.insert(56);
	expect(tree.print()).toBe("[120, 87, 140, 43, 99, 130, 22, 65, 56]");
	expect(tree.height()).toBe(5);

	tree.insert(93);
	tree.insert(135);
	expect(tree.print()).toBe("[120, 87, 140, 43, 99, 130, 22, 65, 93, 135, 56]");

	expect(tree.isEmpty()).toBeFalsy();
});

test("Contains", () => {
	expect(tree.contains(22)).toBeTruthy();
	expect(tree.contains(12)).toBeFalsy();
});

test("Find Min", () => {
	expect(tree.findMin().data).toBe(22);
});

test("Find Max", () => {
	expect(tree.findMax().data).toBe(140);
});

test("Remove Elements", () => {
	tree.remove(22);
	expect(tree.print()).toBe("[120, 87, 140, 43, 99, 130, 65, 93, 135, 56]");

	tree.remove(99);
	expect(tree.print()).toBe("[120, 87, 140, 43, 93, 130, 65, 135, 56]");

	tree.remove(87);
	expect(tree.print()).toBe("[120, 65, 140, 43, 93, 130, 56, 135]");

	tree.remove(120);
	tree.remove(140);
	expect(tree.print()).toBe("[93, 65, 130, 43, 135, 56]");
	expect(tree.height()).toBe(4);

	tree.remove(135);
	tree.remove(56);
	expect(tree.print()).toBe("[93, 65, 130, 43]");
	expect(tree.height()).toBe(3);
});

test("Find Elements", () => {
	expect(tree.find(130).data).toBe(130);
	expect(() => {
		tree.find(1201).data;
	}).toThrow();
});

test("Height", () => {
	expect(tree.height()).toBe(3);
});

test("Make Empty", () => {
	tree.makeEmpty();
	expect(tree.isEmpty()).toBeTruthy();
	expect(tree.print()).toBe("[]");
});
