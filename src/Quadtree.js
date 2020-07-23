"use strict";

/**
 * Utilitary class to help manage Quadtree with a more organised structure.
 */
class Rect {
  /**
   * Rect's contructor.
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

/**
 * Quadtree implementation class
 */
class Quadtree {
  #MAX_OBJECTS = 5;
  #MAX_LEVELS = 5;

  #level = 0;
  #objects;
  #bounds;
  #nodes;

  /**
   * Represents a Quadtree
   * @param {Rect} bounds - Rect representing the bounds of the Quadtree { x, y, width, height }
   * @param {number} level - Starting level of the current Quadtree
   */
  constructor (bounds, level) {
    this.validateRect(bounds, 'Quadtree.bounds should be of Rect type.');

    this.#level = level ?? 0;
    this.#objects = [];
    this.#bounds = bounds;
    this.#nodes = [];
  }

  /**
   * Check if a rect is an instance of Rect and throw an error if not.
   * @param {Rect} rect
   * @param {String} error
   */
  validateRect(rect, error = 'Value should be of Rect type.') {
    if (rect instanceof Rect === false) {
      throw TypeError(error);
    }
  }

  /**
   * Responsible for recursively clearing the Quadtree.
   */
  clear() {
    this.#objects = [];

    this.#nodes.forEach(node => {
      if (node.length) {
        node.clear();
      }
    });
    this.#nodes = [];
  }

  /**
   * Subdivides the Quadtree in four Quadtrees.
   */
  split() {
    const nextLevel = this.#level + 1,
          subWidth  = this.#bounds.width / 2,
          subHeight = this.#bounds.height / 2,
          x         = this.#bounds.x,
          y         = this.#bounds.y;

    this.#nodes[0] = new Quadtree(
      new Rect(x + subWidth,y , subWidth, subHeight),
      nextLevel
    );

    this.#nodes[1] = new Quadtree(
      new Rect(x, y, subWidth, subHeight),
      nextLevel
    );

    this.#nodes[2] = new Quadtree(
      new Rect(x, y + subHeight, subWidth, subHeight),
      nextLevel
    );

    this.#nodes[3] = new Quadtree(
      new Rect(x + subWidth, y + subHeight, subWidth, subHeight),
      nextLevel
    );
  }

  /**
   * Determine which quadrants nodes the desired rect is part of.
   * @param {Rect} rect - rect containing the desired positions and dimensions to check { x, y, width, height }
   * @returns {(number|Array)} - an Array containing the Quadrants that rect overlaps
   */
  getQuadrants(rect) {
    this.validateRect(rect, 'rect should be of Rect type.');
    let indexes            = [],
        verticalMidPoint   = Math.floor(this.#bounds.x + (this.#bounds.width / 2)),
        horizontalMidPoint = Math.floor(this.#bounds.y + (this.#bounds.height / 2));

        const startsOnTop  = rect.y < horizontalMidPoint,
              startsOnLeft = rect.x < verticalMidPoint,
              endsOnRight  = rect.x + rect.width > verticalMidPoint,
              endsOnBottom = rect.y + rect.height > horizontalMidPoint;


        if (startsOnTop && endsOnRight) {
          indexes.push(0);
        }

        if (startsOnLeft && startsOnTop) {
          indexes.push(1);
        }

        if (startsOnLeft && endsOnBottom) {
          indexes.push(2);
        }

        if (endsOnBottom && endsOnRight) {
          indexes.push(3);
        }

        return indexes;
  }

  /**
   * Inserts a Rect inside a Quadtree.
   * @param {Rect} rect - rect to be inserted { x, y, width, height }
   */
  insert (rect) {
    this.validateRect(rect, 'Inserted rect should be of Rect type.');

    let quadrants = this.getQuadrants(rect);

    if (this.#nodes.length) {
      quadrants.forEach((quadrant) => {
        this.#nodes[quadrant].insert(rect);
      })
      return;
    }

    this.#objects.push(rect);

    if (this.#objects.length > this.#MAX_OBJECTS && this.#level < this.#MAX_LEVELS) {
      if (!this.#nodes.length) {
        this.split();
      }

      for (let i = 0; i < this.#objects.length; i++) {
        quadrants = this.getQuadrants(this.#objects[i]);

        quadrants.forEach((quadrant) => {
          this.#nodes[quadrant].insert(this.#objects[i]);
        })
      }

      this.#objects = [];
    }
  }

  /**
   * Retrieves the possible contacts inside the
   * @param {Rect} rect - rect { x, y, width, height }
   * @returns {Array} - array of possible collisions.
   */
  retrieve (rect) {
    let returnObjects = this.#objects,
        quadrants     = this.getQuadrants(rect);

      if (this.#nodes.length) {
        for(let i = 0; i < quadrants.length; i++) {
          returnObjects = returnObjects.concat(this.#nodes[quadrants[i]].retrieve(rect));
        }
      }

    returnObjects = returnObjects.filter(function(item) {
      const sameKeys = Object.keys(item).map((key) => item[key] === rect[key]);
      return sameKeys.some(key => !key);
    });

    return returnObjects;
  }
}

module.exports = {
  Rect,
  Quadtree
};
