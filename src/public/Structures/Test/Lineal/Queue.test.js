const Queue = require("../../Implementations/Lineal/Queue");

let queue = new Queue();

test("Is empty?", () => {
	expect(queue.isEmpty()).toBeTruthy();
});

test("Print empty queue", () => {
	expect(queue.print()).toBe("[]");
});

test("Enqueue new value", () => {
	queue.enqueue("s");
	expect(queue.isEmpty()).toBeFalsy();
	expect(queue.print()).toBe("[s]");
	expect(queue.size).toBe(1);
});

test("Get a top value of queue", () => {
	expect(queue.top()).toBe("s");
});

test("Dequeue a value of queue", () => {
	expect(queue.dequeue()).toBe("s");
	expect(queue.print()).toBe("[]");
	expect(queue.size).toBe(0);
	expect(queue.isEmpty()).toBeTruthy();
});
