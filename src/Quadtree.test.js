const { Quadtree, Rect } = require('./Quadtree');

test('should retrieve near nodes correctly', () => {
  const tree = new Quadtree(new Rect(0, 0, 15, 15));
  const rectsToTest = [new Rect(2, 1, 1, 1), new Rect(2, 3, 1, 1)];
  const testRect = new Rect(6, 1, 1, 1);
  tree.insert(rectsToTest[0]);
  tree.insert(rectsToTest[1]);

  tree.insert(new Rect(15, 0, 1, 1));
  tree.insert(new Rect(15, 1, 1, 1));
  tree.insert(new Rect(12, 12, 1, 1));
  tree.insert(new Rect(6, 1, 1, 1));
  tree.insert(new Rect(7, 1, 1, 1));
  tree.insert(new Rect(8, 1, 1, 1));

  const resultString = JSON.stringify(tree.retrieve(testRect));
  const expectedResultString = JSON.stringify(rectsToTest);
  expect(resultString).toBe(expectedResultString);
});

test('should throw error when not passing valid Rect to constructor', () => {
  const createInvalidQuadtree = () => {
    new Quadtree(1);
  }

  expect(createInvalidQuadtree).toThrow(TypeError);
});

test('should throw error when not passing valid Rect to insert', () => {
  const insertInvalidType = () => {
    const qt = new Quadtree(new Rect(0, 0, 15, 15));
    qt.insert({ x: 0, y: 0, width: 1, height: 1 });
  }

  expect(insertInvalidType).toThrow(TypeError);
});

test('should throw error when not passing Rect to getQuadrants', () => {
  const invalidGetQuadrants = () => {
    const qt = new Quadtree(new Rect(0, 0, 15, 15));
    qt.getQuadrants({ x: 0, y: 0, width: 1, height: 1 });
  }

  expect(invalidGetQuadrants).toThrow(TypeError);
});

