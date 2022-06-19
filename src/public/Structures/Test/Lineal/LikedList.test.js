const LinkedList = require("../../Implementations/Lineal/LinkedList");

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
