# primitive-ellipsoid

[![npm version](https://img.shields.io/npm/v/primitive-ellipsoid)](https://www.npmjs.com/package/primitive-ellipsoid)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/primitive-ellipsoid)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/primitive-ellipsoid)](https://www.npmjs.com/package/primitive-ellipsoid)
[![dependencies](https://img.shields.io/david/dmnsgn/primitive-ellipsoid)](https://github.com/dmnsgn/primitive-ellipsoid/blob/main/package.json)
[![types](https://img.shields.io/npm/types/primitive-ellipsoid)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/dmnsgn/primitive-ellipsoid)](https://github.com/dmnsgn/primitive-ellipsoid/blob/main/LICENSE.md)

An ellipsoid geometry for 3D rendering, including normals, UVs and cell indices (faces).

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)

![](https://raw.githubusercontent.com/dmnsgn/primitive-ellipsoid/main/screenshot.gif)

## Installation

```bash
npm install primitive-ellipsoid
```

## Usage

```js
import createEllipsoid from "primitive-ellipsoid";

const radius = 1;
const geometry = createEllipsoid(radius, {
  latSegments: 64,
  lngSegments: 64,
  rx: 2,
  ry: 1,
  rz: 1,
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

<!-- api-start -->

Auto-generated API content.

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/primitive-ellipsoid/blob/main/LICENSE.md).
