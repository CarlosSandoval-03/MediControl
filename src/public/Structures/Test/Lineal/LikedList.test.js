const LinkedList = require("../../Implementations/Lineal/LinkedList");
const LinealNode = require("../../Implementations/Lineal/LinealNode");

let list = new LinkedList();

test("Is empty? (inicialization case)", () => {
	expect(list.isEmpty()).toBeTruthy();
});

test("Print empty list", () => {
	expect(list.print()).toBe("[]");
});

test("Front push 'a' and 'b' element", () => {
	list.pushFront("a");
	list.pushFront("b");
	expect(list.print()).toBe("[b, a]");
});

test("Is empty? (after push)", () => {
	expect(list.isEmpty()).toBeFalsy();
});

test("Change in size atribute", () => {
	expect(list.size).toBe(2);
});

test("Get top front element", () => {
	expect(list.topFront()).toBe("b");
});

test("Pop front element (without return)", () => {
	list.popFront();
	expect(list.print()).toBe("[a]");
});

test("Pop front change the size?", () => {
	expect(list.size).toBe(1);
});

test("Push back element 'c' and 'd'", () => {
	list.pushBack("c");
	list.pushBack("d");
	expect(list.print()).toBe("[a, c, d]");
});

test("Push back change the size?", () => {
	expect(list.size).toBe(3);
});

test("Get back element", () => {
	expect(list.topBack()).toBe("d");
});

test("Pop back element (without return)", () => {
	list.popBack();
	expect(list.print()).toBe("[a, c]");
});

test("Pop back change the size?", () => {
	expect(list.size).toBe(2);
});

test("Push back element 'e' and 'f'", () => {
	list.pushBack("e");
	list.pushBack("f");
	expect(list.print()).toBe("[a, c, e, f]");
});

test("Get index element (exists)", () => {
	expect(list.findIndex("e")).toBe(2);
});

test("Get index element (not exists)", () => {
	expect(list.findIndex("s")).toBe(-1);
});

test("Exits? (Existing element)", () => {
	expect(list.exists("e")).toBeTruthy();
});

test("Exits? (Not existing element)", () => {
	expect(list.exists("t")).toBeFalsy();
});

test("Get Node with valid index", () => {
	const node = list.getNode(2);
	const isValidNode = node instanceof LinealNode;
	expect(isValidNode && node.data === "e").toBeTruthy();
});

test("Get Node with invalid index", () => {
	expect(() => {
		list.getNode(list.size);
	}).toThrow("INVALID POSITION");
});

test("Erase with data value (existing node)", () => {
	list.erase("e");
	expect(list.print()).toBe("[a, c, f]");
});

test("Erase with data value (not existing value)", () => {
	expect(() => {
		list.erase("n");
	}).toThrow("NOT EXISTING DATA");
});

test("Remove node with valid index", () => {
	list.remove(2);
	expect(list.print()).toBe("[a, c]");
});

test("Remove node with invalid index", () => {
	expect(() => {
		list.remove(list.size);
	}).toThrow("INVALID POSITION");
});

test("Add before node", () => {
	expect(list.print()).toBe("[a, c]");

	const nodeReference = list.getNode(1);
	expect(nodeReference.data).toBe("c");
	expect(nodeReference instanceof LinealNode).toBeTruthy();

	list.addBefore(nodeReference, "v");
	expect(list.print()).toBe("[a, v, c]");
	expect(list.size).toBe(3);
});

test("Add before node with invalid reference", () => {
	expect(() => {
		list.addBefore("ANY VALUE", "e");
	}).toThrow("INVALID NODE");
});

test("Add after node", () => {
	expect(list.print()).toBe("[a, v, c]");

	const nodeReference = list.getNode(1);
	expect(nodeReference.data).toBe("v");
	expect(nodeReference instanceof LinealNode).toBeTruthy();

	list.addAfter(nodeReference, "e");
	expect(list.print()).toBe("[a, v, e, c]");
	expect(list.size).toBe(4);
});

test("Add after node with invalid reference", () => {
	expect(() => {
		list.addAfter("ANY VALUE", "l");
	}).toThrow("INVALID NODE");
});
