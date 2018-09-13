# primitive-ellipsoid [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[![npm version](https://badge.fury.io/js/primitive-ellipsoid.svg)](https://www.npmjs.com/package/primitive-ellipsoid)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

An ellipsoid geometry for 3D rendering, including normals, UVs and cell indices (faces). See [Wolfram MathWorld Ellipsoid](http://mathworld.wolfram.com/Ellipsoid.html).

![](https://raw.githubusercontent.com/dmnsgn/primitive-ellipsoid/master/screenshot.gif)

## Installation

```bash
npm install primitive-ellipsoid
```

[![NPM](https://nodei.co/npm/primitive-ellipsoid.png)](https://nodei.co/npm/primitive-ellipsoid/)

## Usage

```js
const createEllipsoid = require("primitive-ellipsoid");

const radius = 1;
const geometry = createEllipsoid(radius, {
	latSegments: 64,
	lngSegments: 64,
	rx: 2,
	ry: 1,
	rz: 1
});

console.log(geometry);
// {
//   positions: [ [x, y, z], [x, y, z], ... ],
//   cells: [ [a, b, c], [a, b, c], ... ],
//   uvs: [ [u, v], [u, v], ... ],
//   normals: [ [x, y, z], [x, y, z], ... ]
// }
```

## API

### `createEllipsoid(radius, options)`

| Option                  | Type    | Default | Description                     |
| ----------------------- | ------- | ------- | ------------------------------- |
| **radius**              | number? | 1       | Base radius                     |
| **options.latSegments** | number? | 64      | Number of latitudinal segments  |
| **options.lngSegments** | number? | 64      | Number of longitudinal segments |
| **options.rx**          | number? | 2       | Radius in the x direction       |
| **options.ry**          | number? | 1       | Radius in the y direction       |
| **options.rz**          | number? | 1       | Radius in the z direction       |

## License

MIT. See [license file](https://github.com/dmnsgn/primitive-ellipsoid/blob/master/LICENSE.md).
