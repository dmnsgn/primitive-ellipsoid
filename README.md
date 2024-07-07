# primitive-ellipsoid

[![npm version](https://img.shields.io/npm/v/primitive-ellipsoid)](https://www.npmjs.com/package/primitive-ellipsoid)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/primitive-ellipsoid)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/primitive-ellipsoid)](https://bundlephobia.com/package/primitive-ellipsoid)
[![dependencies](https://img.shields.io/librariesio/release/npm/primitive-ellipsoid)](https://github.com/dmnsgn/primitive-ellipsoid/blob/main/package.json)
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

## Functions

<dl>
<dt><a href="#createEllipsoid">createEllipsoid(radius, [options])</a> ⇒ <code><a href="#SimplicialComplex">SimplicialComplex</a></code></dt>
<dd><p>An ellipsoid geometry for 3D rendering, including normals, UVs and cell indices (faces).</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#vec3">vec3</a> : <code>Array.&lt;number&gt;</code></dt>
<dd></dd>
<dt><a href="#Options">Options</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#SimplicialComplex">SimplicialComplex</a> : <code>object</code></dt>
<dd><p>Geometry definition.</p>
</dd>
</dl>

<a name="createEllipsoid"></a>

## createEllipsoid(radius, [options]) ⇒ [<code>SimplicialComplex</code>](#SimplicialComplex)

An ellipsoid geometry for 3D rendering, including normals, UVs and cell indices (faces).

**Kind**: global function
**See**: [Wolfram MathWorld Ellipsoid](http://mathworld.wolfram.com/Ellipsoid.html)

| Param     | Type                             | Default         | Description |
| --------- | -------------------------------- | --------------- | ----------- |
| radius    | <code>number</code>              | <code>1</code>  | Base radius |
| [options] | [<code>Options</code>](#Options) | <code>{}</code> |             |

<a name="vec3"></a>

## vec3 : <code>Array.&lt;number&gt;</code>

**Kind**: global typedef
<a name="Options"></a>

## Options : <code>object</code>

**Kind**: global typedef
**Properties**

| Name          | Type                | Default         | Description                      |
| ------------- | ------------------- | --------------- | -------------------------------- |
| [latSegments] | <code>number</code> | <code>64</code> | Number of latitudinal segments.  |
| [lngSegments] | <code>number</code> | <code>64</code> | Number of longitudinal segments. |
| [rx]          | <code>number</code> | <code>2</code>  | Radius in the x direction.       |
| [ry]          | <code>number</code> | <code>1</code>  | Radius in the y direction.       |
| [rz]          | <code>number</code> | <code>1</code>  | Radius in the z direction.       |

<a name="SimplicialComplex"></a>

## SimplicialComplex : <code>object</code>

Geometry definition.

**Kind**: global typedef
**Properties**

| Name      | Type                                     |
| --------- | ---------------------------------------- |
| positions | [<code>Array.&lt;vec3&gt;</code>](#vec3) |
| normals   | [<code>Array.&lt;vec3&gt;</code>](#vec3) |
| uvs       | [<code>Array.&lt;vec3&gt;</code>](#vec3) |
| cells     | [<code>Array.&lt;vec3&gt;</code>](#vec3) |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/primitive-ellipsoid/blob/main/LICENSE.md).
