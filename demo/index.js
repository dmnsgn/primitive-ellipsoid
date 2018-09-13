const createEllipsoid = require("../");
const { mat4 } = require("gl-matrix");
const io = require("pex-io");
const createContext = require("pex-context");
const createCamera = require("pex-cam/perspective");
const createOrbiter = require("pex-cam/orbiter");

// Geometry
const sphereOptions = { rx: 1, ry: 1, rz: 1 };
const geometry = createEllipsoid(1, {
  // ...sphereOptions
});

// Render
const ctx = createContext();
const camera = createCamera({
  fov: Math.PI / 3,
  aspect: ctx.gl.drawingBufferWidth / ctx.gl.drawingBufferHeight,
  near: 0.1,
  far: 100,
  position: [0, 0, 3]
});
createOrbiter({ camera });

const vert = `
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoord0;

uniform mat4 uProjectionMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;

varying vec3 vNormal;
varying vec2 vTexCoord0;

void main() {
  vNormal = aNormal;
  vTexCoord0 = aTexCoord0;
  mat4 modelViewMatrix = uViewMatrix * uModelMatrix;
  gl_Position = uProjectionMatrix * modelViewMatrix * vec4(aPosition, 1.0);
}
`;

const frag = `
#ifdef GL_ES
precision highp float;
#endif

varying vec3 vNormal;
varying vec2 vTexCoord0;

uniform sampler2D uBaseColorMap;

void main() {
  vec4 texelColor = texture2D(uBaseColorMap, vTexCoord0);

  gl_FragColor = texelColor;
  // gl_FragColor = vec4(vNormal.xyz, 1.0);
  // gl_FragColor = vec4(vTexCoord0.xy, 0.0, 1.0);
}
`;

const drawCmd = {
  pipeline: ctx.pipeline({
    vert,
    frag,
    depthTest: true,
    primitive: ctx.Primitive.Triangles
  }),
  attributes: {
    aPosition: ctx.vertexBuffer(geometry.positions),
    aNormal: ctx.vertexBuffer(geometry.normals),
    aTexCoord0: ctx.vertexBuffer(geometry.uvs)
  },
  indices: ctx.indexBuffer(geometry.cells),
  uniforms: {
    uProjectionMatrix: camera.projectionMatrix,
    uViewMatrix: camera.viewMatrix,
    uModelMatrix: mat4.create(),
    uBaseColorMap: null
  }
};

const clearCmd = {
  pass: ctx.pass({
    clearColor: [0.05, 0.05, 0.05, 1]
  })
};

io.loadImage("demo/uv.jpg").then(image => {
  const uvMap = ctx.texture2D({
    width: 1024,
    height: 1024,
    pixelFormat: ctx.PixelFormat.RGBA8,
    encoding: ctx.Encoding.Linear,
    min: ctx.Filter.Linear,
    mag: ctx.Filter.Linear,
    wrap: ctx.Wrap.Repeat,
    encoding: ctx.Encoding.SRGB,
    flipY: true,
    data: image
  });
  drawCmd.uniforms.uBaseColorMap = uvMap;

  ctx.frame(() => {
    ctx.submit(clearCmd);
    ctx.submit(drawCmd);
  });
});
