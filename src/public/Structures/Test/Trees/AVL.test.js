const AVL = require("../../Implementations/Trees/AVL");

let tree = new AVL();

test("IsEmpty", () => {
	expect(tree.isEmpty()).toBeTruthy();
	expect(tree.height()).toBe(0);
});

test("Insert Elements", () => {
	tree.insert(65);
	expect(tree.root.data).toBe(65);
	expect(tree.height()).toBe(1);

	tree.insert(50);
	tree.insert(23);
	expect(tree.height()).toBe(2);
	expect(tree.print()).toBe("[50, 23, 65]");

	tree.insert(70);
	tree.insert(82);
	expect(tree.height()).toBe(3);
	expect(tree.print()).toBe("[50, 23, 70, 65, 82]");

	tree.insert(68);
	expect(tree.print()).toBe("[65, 50, 70, 23, 68, 82]");

	tree.insert(39);
	expect(tree.print()).toBe("[65, 39, 70, 23, 50, 68, 82]");

	tree.insert(10);
	tree.insert(43);
	tree.insert(59);
	tree.insert(66);
	expect(tree.print()).toBe("[65, 39, 70, 23, 50, 68, 82, 10, 43, 59, 66]");

	expect(tree.isEmpty()).toBeFalsy();
});

test("Contains", () => {
	expect(tree.contains(23)).toBeTruthy();
	expect(tree.contains(12)).toBeFalsy();
});

test("Find Min", () => {
	expect(tree.findMin().data).toBe(10);
});

test("Find Max", () => {
	expect(tree.findMax().data).toBe(82);
});

test("Remove Elements", () => {
	expect(tree.print()).toBe("[65, 39, 70, 23, 50, 68, 82, 10, 43, 59, 66]");

	tree.remove(82);
	expect(tree.print()).toBe("[65, 39, 68, 23, 50, 66, 70, 10, 43, 59]");

	tree.remove(10);
	expect(tree.print()).toBe("[65, 39, 68, 23, 50, 66, 70, 43, 59]");

	tree.remove(39);
	expect(tree.print()).toBe("[65, 50, 68, 23, 59, 66, 70, 43]");

	tree.remove(65);
	expect(tree.print()).toBe("[59, 43, 68, 23, 50, 66, 70]");

	tree.remove(70);
	tree.remove(23);
	tree.remove(50);
	expect(tree.print()).toBe("[59, 43, 68, 66]");

	tree.remove(43);
	expect(tree.print()).toBe("[66, 59, 68]");
});

test("Find Elements", () => {
	expect(tree.find(59).data).toBe(59);
	expect(() => {
		tree.find(1201).data;
	}).toThrow();
});

test("Height", () => {
	expect(tree.height()).toBe(2);
});

test("Make Empty", () => {
	tree.makeEmpty();
	expect(tree.isEmpty()).toBeTruthy();
	expect(tree.print()).toBe("[]");
});
