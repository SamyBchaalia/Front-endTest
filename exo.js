var WATER_POINT_TYPE = "WATER";
var EARTH_POINT_TYPE = "EARTH";
var POINT_TYPES = [WATER_POINT_TYPE, EARTH_POINT_TYPE];

var DEFAULT_WATER_COLOR = [30, 144, 255];
var DEFAULT_EARTH_COLOR = [105, 105, 105];
var DEFAULT_COLORS = {
  [WATER_POINT_TYPE]: DEFAULT_WATER_COLOR, // blue
  [EARTH_POINT_TYPE]: DEFAULT_EARTH_COLOR, // dark grey
};

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

class Map {
  constructor(height, width) {
    var map = [];
    for (var i = 0; i < height; i++) {
      var row = [];
      for (var j = 0; j < width; j++) {
        row.push(this.generatePointType());
      }
      map.push(row);
    }
    this.map = map;
  }

  generatePointType() {
    return POINT_TYPES[generateRandomInteger(2)];
  }

  generateRandomColor() {
    var color = undefined;
    while (!color || Object.keys(DEFAULT_COLORS).includes(color)) {
      color = [];
      for (var i = 0; i < 3; i++) {
        color.push(generateRandomInteger(256));
      }
    }
    return color;
  }

  getRawMap() {
    var rawMap = [];
    for (var i = 0; i < this.map.length; i++) {
      var row = [];
      for (var j = 0; j < this.map[i].length; j++) {
        row.push(DEFAULT_COLORS[this.map[i][j]]);
      }
      rawMap.push(row);
    }
    return rawMap;
  }
  //get A copy of the dimentional array
  makeMapCopy() {
    const newMap = [];
    for (let i = 0; i < this.map.length; i++) {
      newMap[i] = this.map[i].slice();
    }
    return newMap;
  }
  //this function is the one responsible of changing the map colors
  colorate(row, col, color, coloredMap) {
    if (coloredMap[row][col] === WATER_POINT_TYPE) {
      coloredMap[row][col] = DEFAULT_COLORS[coloredMap[row][col]];
      return;
    }
    if (coloredMap[row][col] !== EARTH_POINT_TYPE) return;
    coloredMap[row][col] = color;
    const neighbors = this.getNeighbors(coloredMap, row, col);
    for (const [neighborRow, neighborCol] of neighbors) {
      this.colorate(neighborRow, neighborCol, color, coloredMap);
    }
  }
  //get neighborhood (adjacents cells top,bottom,left,right)
  getNeighbors(coloredMap, row, col) {
    const neighbors = [];
    if (row !== 0) neighbors.push([row - 1, col]);
    if (col !== 0) neighbors.push([row, col - 1]);
    if (row !== coloredMap.length - 1) neighbors.push([row + 1, col]);
    if (col !== coloredMap[0].length - 1) neighbors.push([row, col + 1]);
    return neighbors;
  }

  getColoredMap() {
    // // TODO: That's where you work
    const coloredMap = this.makeMapCopy();
    for (let i = 0; i < coloredMap.length; i++) {
      for (let j = 0; j < coloredMap[i].length; j++) {
        this.colorate(i, j, this.generateRandomColor(), coloredMap);
      }
    }
    return coloredMap;
  }
}
