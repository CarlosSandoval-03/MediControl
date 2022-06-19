const Stack = require("../../Implementations/Lineal/Stack");

let stack = new Stack();

test("Is empty?", () => {
	expect(stack.isEmpty()).toBeTruthy();
	expect(stack.print()).toBe("[]");
});

test("Push element", () => {
	stack.push("t");

	expect(stack.isEmpty()).toBeFalsy();
	expect(stack.print()).toBe("[t]");
	expect(stack.size).toBe(1);
});

test("Get a top element", () => {
	expect(stack.top()).toBe("t");
});

test("Pop element", () => {
	expect(stack.pop()).toBe("t");
	expect(stack.isEmpty()).toBeTruthy();
	expect(stack.size).toBe(0);
	expect(stack.print()).toBe("[]");
});
