const { vec3 } = require("gl-matrix");

const tmp = [0, 0, 0];

function createEllipsoid(radius = 1, options) {
  // Default to an oblate spheroid
  const { latSegments = 32, lngSegments = 64, rx = 2, ry = 1, rz = 1 } = {
    ...options
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

      const x = -rx * cosPhi * sinTheta;
      const y = ry * cosTheta;
      const z = rz * sinPhi * sinTheta;

      vec3.set(tmp, x, y, z);
      vec3.scale(tmp, tmp, radius);
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
          firstIndex + lngSegments + 1
        ]);
        cells.push([
          firstIndex + lngSegments + 1,
          firstIndex + 1,
          firstIndex + lngSegments + 2
        ]);
      }
    }
  }

  return {
    cells,
    positions,
    normals,
    uvs
  };
}

module.exports = createEllipsoid;
