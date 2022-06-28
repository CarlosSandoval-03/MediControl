const BinaryHeap = require("../../Implementations/PriorityQueue/BinaryHeap");

let heap = new BinaryHeap();

test("Is Empty?", () => {
	expect(heap.size).toBe(0);
	expect(() => {
		heap.extractMax();
	}).toThrow();
	expect(() => {
		heap.remove(1201);
	}).toThrow();
});

test("Insert Elements", () => {
	heap.insert(45);

	expect(heap.size).toBe(1);
	expect(heap.print()).toBe("[45]");

	heap.insert(33);
	heap.insert(3);
	heap.insert(17);
	heap.insert(25);
	heap.insert(-34);
	heap.insert(-55);
	heap.insert(4);
	heap.insert(14);
	expect(heap.size).toBe(9);
	expect(heap.print()).toBe("[45, 33, 3, 17, 25, -34, -55, 4, 14]");

	heap.insert(22);
	expect(heap.size).toBe(10);
	expect(heap.print()).toBe("[45, 33, 3, 17, 25, -34, -55, 4, 14, 22]");

	heap.insert(39);
	expect(heap.size).toBe(11);
	expect(heap.print()).toBe("[45, 39, 3, 17, 33, -34, -55, 4, 14, 22, 25]");
});
