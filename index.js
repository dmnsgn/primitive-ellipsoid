import { vec3 } from "gl-matrix";

const tmp = [0, 0, 0];

/**
 * @typedef {number[]} vec3
 */

/**
 * @typedef {object} Options
 * @property {number} [latSegments=64] Number of latitudinal segments.
 * @property {number} [lngSegments=64] Number of longitudinal segments.
 * @property {number} [rx=2] Radius in the x direction.
 * @property {number} [ry=1] Radius in the y direction.
 * @property {number} [rz=1] Radius in the z direction.
 */

/**
 * @typedef {object} SimplicialComplex Geometry definition.
 * @property {vec3[]} positions
 * @property {vec3[]} normals
 * @property {vec3[]} uvs
 * @property {vec3[]} cells
 */

/**
 * An ellipsoid geometry for 3D rendering, including normals, UVs and cell indices (faces).
 *
 * @param {number} radius Base radius
 * @param {Options} [options={}]
 * @returns {SimplicialComplex}
 * @see [Wolfram MathWorld Ellipsoid]{@link http://mathworld.wolfram.com/Ellipsoid.html}
 */
function createEllipsoid(radius = 1, options = {}) {
  // Default to an oblate spheroid
  const {
    latSegments = 32,
    lngSegments = 64,
    rx = 2,
    ry = 1,
    rz = 1,
  } = {
    ...options,
  };

  const cells = [];
  const positions = [];
  const normals = [];
  const uvs = [];

  for (let latSteps = 0; latSteps <= latSegments; latSteps++) {
    const normalizedZ = latSteps / latSegments;
    const theta = normalizedZ * Math.PI;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let lngSteps = 0; lngSteps <= lngSegments; lngSteps++) {
      const normalizedY = lngSteps / lngSegments;
      const phi = normalizedY * Math.PI * 2;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      const x = rx * cosPhi * sinTheta;
      const y = ry * cosTheta;
      const z = -rz * sinPhi * sinTheta;

      vec3.set(tmp, x, y, z);
      vec3.scale(tmp, tmp, -radius);
      positions.push([...tmp]);

      vec3.normalize(tmp, tmp);
      normals.push([...tmp]);

      uvs.push([normalizedY, normalizedZ]);
    }

    if (latSteps > 0) {
      const verticesCount = positions.length;

      for (
        let firstIndex = verticesCount - 2 * (lngSegments + 1);
        firstIndex + lngSegments + 2 < verticesCount;
        firstIndex++
      ) {
        cells.push([
          firstIndex + 0,
          firstIndex + 1,
          firstIndex + lngSegments + 1,
        ]);
        cells.push([
          firstIndex + lngSegments + 1,
          firstIndex + 1,
          firstIndex + lngSegments + 2,
        ]);
      }
    }
  }

  return {
    cells,
    positions,
    normals,
    uvs,
  };
}

export default createEllipsoid;
