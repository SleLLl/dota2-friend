export const mapCoordinates = [
  {
    kind: 'radiant-fountain',
    x: -7112,
    y: -6600,
  },
  {
    kind: 'radiant-throne',
    x: -5573,
    y: -5057,
  },
  {
    kind: 'radiant-t3-top',
    x: -6573,
    y: -3236,
  },
  {
    kind: 'radiant-t3-mid',
    x: -4462,
    y: -4134,
  },
  {
    kind: 'radiant-t3-bottom',
    x: -3784,
    y: -6177,
  },
  {
    kind: 'radiant-t2-top',
    x: -6264,
    y: -701,
  },
  {
    kind: 'radiant-t2-mid',
    x: -3261,
    y: -2637,
  },
  {
    kind: 'radiant-t2-bottom',
    x: -195,
    y: -6300,
  },
  {
    kind: 'radiant-t1-top',
    x: -6332,
    y: 2027,
  },
  {
    kind: 'radiant-t1-mid',
    x: -1384,
    y: -1344,
  },
  {
    kind: 'radiant-t1-bottom',
    x: 5093,
    y: -6053,
  },
  {
    kind: 'bottom-line-t1-big-forest-camp',
    x: 4743,
    y: -7401,
  },
  {
    kind: 'bottom-line-t1-small-camp',
    x: 4322,
    y: -8279,
  },
  {
    kind: 'bottom-line-t2-t1-big-forest-camp',
    x: 1722,
    y: -8401,
  },
  {
    kind: 'bottom-line-t2-middle-forest-camp',
    x: -85,
    y: -7508,
  },
  {
    kind: 'bottom-line-big-forest-camp',
    x: -2423,
    y: -8416,
  },
  {
    kind: 'radiant-top-forest-centre',
    x: -4130,
    y: -216,
  },
  {
    kind: 'radiant-wisdom-rune',
    x: -8127,
    y: -322,
  },
  {
    kind: 'top-lotus-fountain',
    x: -7252,
    y: 4285,
  },
  {
    kind: 'top-roshan-spot',
    x: -7637,
    y: 7536,
  },
  {
    kind: 'dare-bottom-forest-centre',
    x: 3522,
    y: -352,
  },
  {
    kind: 'dare-wisdom-rune',
    x: 8312,
    y: 259,
  },
  {
    kind: 'bottom-lotus-fountain',
    x: 7488,
    y: -4946,
  },
  {
    kind: 'bottom-roshan-spot',
    x: 7684,
    y: -7753,
  },
  {
    kind: 'dare-fountain',
    x: 6943,
    y: 6389,
  },
  {
    kind: 'dare-throne',
    x: 5145,
    y: 4647,
  },
  {
    kind: 'dare-t3-top',
    x: 3389,
    y: 5859,
  },
  {
    kind: 'dare-t3-mid',
    x: 4129,
    y: 3655,
  },
  {
    kind: 'dare-t3-bottom',
    x: 6331,
    y: 2856,
  },
  {
    kind: 'dare-t2-top',
    x: -278,
    y: 6099,
  },
  {
    kind: 'dare-t2-mid',
    x: 2347,
    y: 2022,
  },
  {
    kind: 'dare-t2-bottom',
    x: 6419,
    y: 212,
  },
  {
    kind: 'dare-t1-top',
    x: -4841,
    y: 6044,
  },
  {
    kind: 'dare-t1-mid',
    x: 423,
    y: 512,
  },
  {
    kind: 'dare-t1-bottom',
    x: 6263,
    y: -2411,
  },
  {
    kind: 'dare-forest-centre',
    x: -1364,
    y: 3746,
  },
  {
    kind: 'radiant-forest-centre',
    x: 1174,
    y: -3978,
  },
  {
    name: 'spawner-bounty-top',
    x: -1536,
    y: 3456,
  },
  {
    name: 'spawner-bounty-bottom',
    x: 2179,
    y: -3907,
  },
];

// Function to calculate Euclidean distance between two points
const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

// Function to get the closest position
export const getClosestPosition = (x: number, y: number) => {
  let closestPosition = null;
  let minDistance = Infinity;

  // Iterate through all predefined positions
  for (const position of mapCoordinates) {
    const distance = getDistance(x, y, position.x, position.y);

    // If the current position is closer, update the closest position
    if (distance < minDistance) {
      minDistance = distance;
      closestPosition = position;
    }
  }

  return closestPosition!;
};
