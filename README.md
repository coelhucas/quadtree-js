Quadtree.js
------
![issues shield badge](https://img.shields.io/github/issues/coelhucas/quadtree-js) ![license shield badge](https://img.shields.io/badge/license-MIT-green)

Simple class implementing a [Quadtree](https://en.wikipedia.org/wiki/Quadtree). This was made to work with 2D Collision detection, but as a generic implementation can be used in other purposes that uses a Rect `{ x, y, width, height }`.

Usage
------

All you need is the [Quadtree.js](./src/Quadtree.js) file
```js
const { Quadtree, Rect } = require('./Quadtree.js');
// Creating a Quadtree with 640x480 dimensions
const treeBounds = new Rect(0, 0, 640, 480);
const tree = new Quadtree(treeBounds);

// Inserting points onto the Quadtree
tree.insert(new Rect(15, 0, 1, 1));
tree.insert(new Rect(15, 1, 1, 1));
tree.insert(new Rect(12, 12, 1, 1));
tree.insert(new Rect(6, 1, 1, 1));
tree.insert(new Rect(7, 1, 1, 1));
tree.insert(new Rect(8, 1, 1, 1));

// Retrieving possible collisions based on a Rect
tree.retrieve(new Rect(6, 1, 1, 1));
// -> [Rect{2, 1, 1, 1}, Rect{2, 3, 1, 1}]
```

License
------
```
Copyright 2020 Lucas Coelho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

```
