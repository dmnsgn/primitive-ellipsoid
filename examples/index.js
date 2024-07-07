import createEllipsoid from "../index.js";

import { mat4 } from "gl-matrix";
import AsyncPreloader from "async-preloader";
import createContext from "pex-context";
import { PerspectiveCamera, Controls } from "cameras";
import { Pane } from "tweakpane";

const modeOptions = ["texture", "normal", "flat-shaded", "uv"];
const CONFIG = {
  mode: "texture",
};
const pane = new Pane();
pane.addBinding(CONFIG, "mode", {
  options: modeOptions.map((value) => ({
    text: value.toUpperCase(),
    value,
  })),
});

// Geometry
const geometry = createEllipsoid(0.5);

// Render
const canvas = document.createElement("canvas");
document.querySelector("main").appendChild(canvas);
const ctx = createContext({ canvas });

const camera = new PerspectiveCamera({ position: [0, 0, 3] });
const controls = new Controls({ element: canvas, camera });

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
  data: await AsyncPreloader.loadImage({
    src: new URL("./uv.jpg", import.meta.url),
  }),
});

// Events
const onResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  canvas.width = width;
  canvas.height = height;
};

const drawLines = {
  pipeline: ctx.pipeline({
    vert: /* glsl */ `#version 300 es
in vec3 aPosition;
in vec4 aColor;

uniform mat4 uProjectionMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;

out vec4 vColor;

void main () {
  vColor = aColor;
  vec3 position = aPosition;
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(position, 1.0);
}`,
    frag: /* glsl */ `#version 300 es
precision highp float;

in vec4 vColor;

layout (location = 0) out vec4 outColor;

void main () {
  outColor = vColor;
}`,
    depthTest: true,
    primitive: ctx.Primitive.Lines,
  }),
  attributes: {
    aPosition: ctx.vertexBuffer([
      [0, 0, 0],
      [1, 0, 0],
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 1],
    ]),
    aColor: ctx.vertexBuffer([
      [1, 0, 0, 1],
      [1, 0.5, 0.5, 1],
      [0, 1, 0, 1],
      [0.5, 1, 0.5, 1],
      [0, 0, 1, 1],
      [0.5, 0.5, 1, 1],
    ]),
  },
  indices: ctx.indexBuffer([
    [0, 1],
    [2, 3],
    [4, 5],
  ]),
  uniforms: {
    uProjectionMatrix: null,
    uViewMatrix: null,
    uModelMatrix: mat4.create(),
  },
};

const drawCmd = {
  pipeline: ctx.pipeline({
    vert: /* glsl */ `#version 300 es
in vec3 aPosition;
in vec3 aNormal;
in vec2 aUv;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uInverseViewMatrix;

out vec3 vPositionWorld;
out vec3 vPositionView;
out vec3 vNormal;
out vec2 vUv;

void main() {
  vNormal = aNormal;
  vUv = aUv;

  vPositionWorld = (uModelMatrix * vec4(aPosition, 1.0)).xyz;
  vPositionView = (uViewMatrix * vec4(vPositionWorld, 1.0)).xyz;

  gl_Position = uProjectionMatrix * vec4(vPositionView, 1.0);
}
`,
    frag: /* glsl */ `#version 300 es
precision highp float;

in vec3 vNormal;
in vec2 vUv;

uniform sampler2D uBaseColorMap;
uniform float uMode;

in vec3 vPositionWorld;

layout (location = 0) out vec4 outColor;

void main() {
  if (uMode == 0.0) outColor = texture(uBaseColorMap, vUv);
  if (uMode == 1.0) outColor = vec4(vNormal * 0.5 + 0.5, 1.0);
  if (uMode == 2.0) {
    vec3 fdx = vec3(dFdx(vPositionWorld.x), dFdx(vPositionWorld.y), dFdx(vPositionWorld.z));
    vec3 fdy = vec3(dFdy(vPositionWorld.x), dFdy(vPositionWorld.y), dFdy(vPositionWorld.z));
    vec3 normal = normalize(cross(fdx, fdy));
    outColor = vec4(normal * 0.5 + 0.5, 1.0);
  }
  if (uMode == 3.0) outColor = vec4(vUv.xy, 0.0, 1.0);
}
`,
    depthTest: true,
    primitive: ctx.Primitive.Triangles,
  }),
  attributes: {
    aPosition: ctx.vertexBuffer(geometry.positions),
    aNormal: ctx.vertexBuffer(geometry.normals),
    aUv: ctx.vertexBuffer(geometry.uvs),
  },
  indices: ctx.indexBuffer(geometry.cells),
  uniforms: {
    uProjectionMatrix: camera.projectionMatrix,
    uViewMatrix: camera.viewMatrix,
    uModelMatrix: mat4.create(),
    uBaseColorMap: uvMap,
  },
};

const clearCmd = {
  pass: ctx.pass({
    clearColor: [0.05, 0.05, 0.05, 1],
  }),
};

onResize();

ctx.frame(() => {
  ctx.submit(clearCmd);

  controls.update();
  camera.position = controls.position;
  camera.target = controls.target;
  camera.update();

  drawLines.uniforms.uProjectionMatrix = camera.projectionMatrix;
  drawLines.uniforms.uViewMatrix = camera.viewMatrix;

  ctx.submit(drawLines);

  ctx.submit(drawCmd, {
    uniforms: {
      uMode: modeOptions.findIndex((o) => o === CONFIG.mode),
    },
  });
});

window.addEventListener("resize", onResize);
