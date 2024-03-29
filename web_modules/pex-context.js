import './common/es.typed-array.uint8-array-c1f66f2e.js';
import { a as assert_1, p as process } from './common/assert-47541955.js';
import { r as raf_1 } from './common/index-77615f8d.js';
import './common/esnext.set.union-8fae8fd1.js';
import { c as createCommonjsModule } from './common/to-object-b740b57d.js';
import './common/es.typed-array.float32-array-8546d559.js';
import './common/es.typed-array.uint32-array-87915905.js';
import './common/typed-array-constructor-64e99d87.js';

function createGL(opts) {
  assert_1(!opts || typeof opts === 'object', 'pex-gl: createGL requires opts argument to be null or an object');
  if (!opts) opts = {};
  let canvas = opts.canvas;
  const pixelRatio = opts.pixelRatio || 1;
  const fullscreen = !opts.width && !opts.height;

  if (!canvas) {
    canvas = document.createElement('canvas');

    if (fullscreen) {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'viewport');
      meta.setAttribute('content', 'width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=0.0');
      document.head.appendChild(meta);
    }

    const appendCanvas = () => {
      if (fullscreen) {
        document.body.style.margin = '0px';
        document.body.style.overflow = 'hidden';
        document.body.style.background = '#000';
      }

      document.body.appendChild(canvas);
    };

    const W = opts.width || window.innerWidth;
    const H = opts.height || window.innerHeight;

    if (pixelRatio !== 1) {
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      canvas.width = W * pixelRatio;
      canvas.height = H * pixelRatio;
    } else {
      canvas.width = W * pixelRatio;
      canvas.height = H * pixelRatio;
    }

    if (document.body) {
      appendCanvas();
    } else {
      // just in case our script is included above <body>
      document.addEventListener('DOMContentLoaded', appendCanvas);
    }
  }

  const contexts = ['webgl', 'experimental-webgl'];

  for (var i = 0; i < contexts.length; i++) {
    try {
      const gl = canvas.getContext(contexts[i], opts);

      if (!gl) {
        throw new Error('Canvas.getContext returned null');
      }

      console.info('pex-gl', 'Creating', contexts[i], 'succeeded');
      return gl;
    } catch (e) {
      console.warn('pex-gl', 'Creating', contexts[i], 'failed', e);
    }
  }
}

var indexBrowser = createGL;

var client = true;

/**
 * Helpers.
 */
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms = function (val, options) {
  options = options || {};
  var type = typeof val;

  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }

  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */


function parse(str) {
  str = String(str);

  if (str.length > 100) {
    return;
  }

  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);

  if (!match) {
    return;
  }

  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;

    case 'days':
    case 'day':
    case 'd':
      return n * d;

    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;

    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;

    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;

    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;

    default:
      return undefined;
  }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }

  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }

  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }

  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }

  return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtLong(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}
/**
 * Pluralization helper.
 */


function plural(ms, n, name) {
  if (ms < n) {
    return;
  }

  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }

  return Math.ceil(ms / n) + ' ' + name + 's';
}

var debug = createCommonjsModule(function (module, exports) {
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   *
   * Expose `debug()` as the module.
   */
  exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms;
  /**
   * The currently active debug mode names, and names to skip.
   */

  exports.names = [];
  exports.skips = [];
  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
   */

  exports.formatters = {};
  /**
   * Previous log timestamp.
   */

  var prevTime;
  /**
   * Select a color.
   * @param {String} namespace
   * @return {Number}
   * @api private
   */

  function selectColor(namespace) {
    var hash = 0,
        i;

    for (i in namespace) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return exports.colors[Math.abs(hash) % exports.colors.length];
  }
  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */


  function createDebug(namespace) {
    function debug() {
      // disabled?
      if (!debug.enabled) return;
      var self = debug; // set `diff` timestamp

      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr; // turn the `arguments` into a proper Array

      var args = new Array(arguments.length);

      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %O
        args.unshift('%O');
      } // apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];

        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val); // now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // apply env-specific formatting (colors, etc.)

      exports.formatArgs.call(self, args);
      var logFn = debug.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = exports.enabled(namespace);
    debug.useColors = exports.useColors();
    debug.color = selectColor(namespace); // env-specific initialization logic for debug instances

    if ('function' === typeof exports.init) {
      exports.init(debug);
    }

    return debug;
  }
  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */


  function enable(namespaces) {
    exports.save(namespaces);
    exports.names = [];
    exports.skips = [];
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (var i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }
  }
  /**
   * Disable debug output.
   *
   * @api public
   */


  function disable() {
    exports.enable('');
  }
  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */


  function enabled(name) {
    var i, len;

    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */


  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
});

var browser = createCommonjsModule(function (module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */
  exports = module.exports = debug;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
  /**
   * Colors.
   */

  exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];
  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
      return true;
    } // is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
    typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */


  exports.formatters.j = function (v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return '[UnexpectedJSONParseError]: ' + err.message;
    }
  };
  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */


  function formatArgs(args) {
    var useColors = this.useColors;
    args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
    if (!useColors) return;
    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit'); // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into

    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function (match) {
      if ('%%' === match) return;
      index++;

      if ('%c' === match) {
        // we only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */


  function log() {
    // this hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
  }
  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */


  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch (e) {}
  }
  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */


  function load() {
    var r;

    try {
      r = exports.storage.debug;
    } catch (e) {} // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }
  /**
   * Enable namespaces listed in `localStorage.debug` initially.
   */


  exports.enable(load());
  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {}
  }
});

function checkProps(allowedProps, obj) {
  Object.keys(obj).forEach(prop => {
    if (allowedProps.indexOf(prop) === -1) {
      throw new Error(`Unknown prop "${prop}"`);
    }
  });
}

var checkProps_1 = checkProps;

const allowedProps = ['name', 'data', 'width', 'height', 'pixelFormat', 'encoding', 'flipY', 'mipmap', 'target', 'min', 'mag', 'wrap', 'wrapS', 'wrapT', 'aniso', 'premultiplayAlpha'];

function createTexture(ctx, opts) {
  checkProps_1(allowedProps, opts);
  const gl = ctx.gl;
  const texture = {
    class: 'texture',
    handle: gl.createTexture(),
    target: opts.target,
    width: 0,
    height: 0,
    _update: updateTexture2D,
    _dispose: function () {
      gl.deleteTexture(this.handle);
      this.handle = null;
    }
  };
  updateTexture2D(ctx, texture, opts);
  return texture;
}

function orValue(a, b) {
  return a !== undefined ? a : b;
} // opts = { src, width, height }
// opts = { data, width, height, pixelFormat, encoding, flipY }


function updateTexture2D(ctx, texture, opts) {
  // checkProps(allowedProps, opts)
  const gl = ctx.gl;
  const PixelFormat = ctx.PixelFormat;
  let data = null;
  let width = opts.width;
  let height = opts.height;
  let lod = 0;
  let flipY = orValue(opts.flipY, orValue(texture.flipY, false));
  let target = opts.target || texture.target;
  let pixelFormat = opts.pixelFormat || texture.pixelFormat || ctx.PixelFormat.RGBA8;
  let encoding = opts.encoding || texture.encoding || ctx.Encoding.Linear;
  let min = opts.min || texture.min || gl.NEAREST;
  let mag = opts.mag || texture.mag || gl.NEAREST;
  let wrapS = opts.wrapS || texture.wrapS || opts.wrap || texture.wrap || gl.CLAMP_TO_EDGE;
  let wrapT = opts.wrapT || texture.wrapT || opts.wrap || texture.wrap || gl.CLAMP_TO_EDGE;
  let aniso = opts.aniso || texture.aniso || 0;
  let premultiplayAlpha = orValue(opts.premultiplayAlpha, orValue(texture.premultiplayAlpha, false));
  let internalFormat;
  let type;
  let format;
  var anisoExt = gl.getExtension('EXT_texture_filter_anisotropic');
  const textureUnit = 0;
  gl.activeTexture(gl.TEXTURE0 + textureUnit);
  gl.bindTexture(texture.target, texture.handle);
  ctx.state.activeTextures[textureUnit] = texture;
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiplayAlpha);
  gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, mag);
  gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, min);
  gl.texParameteri(target, gl.TEXTURE_WRAP_S, wrapS);
  gl.texParameteri(target, gl.TEXTURE_WRAP_T, wrapT);

  if (anisoExt && aniso > 0) {
    gl.texParameterf(target, anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, aniso);
  } // just an image
  // opts = HTMLImage
  // image with flags
  // opts = { data: HTMLImage, flipY: Boolean }
  // pixel data
  // opts = { data: Array, width: Number, height: Number, flipY: Boolean }
  // pixel data with flags
  // opts = { data: { data: Array, width: Number, height: Number }, flipY: Boolean },
  // array of images for cubemaps (and array textures in webgl2)
  // opts = { data: [ HTMLImage, ... ], width: Number, height: Number, flipY: Boolean }
  // array of pixel data for cubemaps (and array texture in webgl2)
  // opts = { data: [ { data: Array, width: Number, height: Number }, ..], flipY: Boolean }


  const img = opts.data ? opts.data : opts;

  if (img && img.nodeName) {
    assert_1(img instanceof window.HTMLImageElement || img instanceof window.HTMLVideoElement || img instanceof window.HTMLCanvasElement, 'Texture2D.update opts has to be Image, Canvas or Video element');
    width = img.width || img.videoHeight;
    height = img.height || img.videoHeight;
    internalFormat = gl.RGBA;
    format = gl.RGBA;
    type = gl.UNSIGNED_BYTE;
    gl.texImage2D(target, lod, internalFormat, format, type, img);
    texture.width = width;
    texture.height = height;
  } else if (typeof opts === 'object') {
    assert_1(!data || Array.isArray(opts.data) || opts.data instanceof Uint8Array || opts.data instanceof Float32Array, 'Texture2D.update opts.data has to be null or an Array, Uint8Array or Float32Array');
    data = opts.data ? opts.data.data || opts.data : null;
    if (!opts.width && data && data.width) width = data.width;
    if (!opts.height && data && data.height) width = data.height;
    assert_1(!data || width !== undefined && height !== undefined, 'Texture2D.update opts.width and opts.height are required when providing opts.data');

    if (pixelFormat === PixelFormat.Depth || pixelFormat === PixelFormat.Depth16) {
      format = gl.DEPTH_COMPONENT;
      internalFormat = gl.DEPTH_COMPONENT;
      type = gl.UNSIGNED_SHORT;
    } else if (pixelFormat === PixelFormat.Depth24) {
      format = gl.DEPTH_COMPONENT;
      internalFormat = gl.DEPTH_COMPONENT;
      type = gl.UNSIGNED_INT;
    } else if (pixelFormat === PixelFormat.RGBA8) {
      format = gl.RGBA;
      internalFormat = gl.RGBA;
      type = gl.UNSIGNED_BYTE;
    } else if (pixelFormat === PixelFormat.RGBA32F) {
      format = gl.RGBA;
      internalFormat = gl.RGBA;
      type = gl.FLOAT;
    } else if (pixelFormat === PixelFormat.RGBA16F) {
      format = gl.RGBA;
      internalFormat = gl.RGBA;
      type = gl.HALF_FLOAT;
    } else if (pixelFormat === PixelFormat.R32F) {
      format = gl.ALPHA;
      internalFormat = gl.ALPHA;
      type = gl.FLOAT;
    } else if (pixelFormat) {
      assert_1.fail(`Unknown texture pixel format: ${opts.format}`);
    }

    if (target === gl.TEXTURE_2D) {
      if (Array.isArray(data)) {
        if (type === gl.UNSIGNED_BYTE) {
          data = new Uint8Array(data);
        } else if (type === gl.FLOAT) {
          data = new Float32Array(data);
        } else if (type === gl.HALF_FLOAT) {
          data = new Float32Array(data);
        } else {
          assert_1.fail(`Unknown texture data type: ${type}`);
        }
      }

      if (width && height) {
        gl.texImage2D(target, lod, internalFormat, width, height, 0, format, type, data);
        texture.width = width;
        texture.height = height;
      }
    } else if (target === gl.TEXTURE_CUBE_MAP) {
      assert_1(!data || Array.isArray(data) && data.length === 6, 'TextureCube requires data for 6 faces');

      for (let i = 0; i < 6; i++) {
        let faceData = data ? data[i].data || data[i] : null;
        const faceTarget = gl.TEXTURE_CUBE_MAP_POSITIVE_X + i;

        if (Array.isArray(faceData)) {
          if (type === gl.UNSIGNED_BYTE) {
            faceData = new Uint8Array(faceData);
          } else if (type === gl.FLOAT) {
            faceData = new Float32Array(data);
          } else {
            assert_1.fail(`Unknown texture data type: ${type}`);
          }

          gl.texImage2D(faceTarget, lod, internalFormat, width, height, 0, format, type, faceData);
        } else if (faceData && faceData.nodeName) {
          gl.texImage2D(faceTarget, lod, internalFormat, format, type, faceData);
        } else {
          gl.texImage2D(faceTarget, lod, internalFormat, width, height, 0, format, type, faceData);
        }

        texture.width = width;
        texture.height = height;
      }
    }
  } else {
    // TODO: should i assert of throw new Error(msg)?
    assert_1.fail('Texture2D.update opts has to be a HTMLElement or Object');
  }

  if (opts.mipmap) {
    gl.generateMipmap(texture.target);
  }

  texture.target = target;
  texture.pixelFormat = pixelFormat;
  texture.encoding = encoding;
  texture.min = min;
  texture.mag = mag;
  texture.wrapS = wrapS;
  texture.wrapT = wrapT;
  texture.format = format;
  texture.flipY = flipY;
  texture.internalFormat = internalFormat;
  texture.type = type;
  texture.info = '';
  texture.info += Object.keys(ctx.PixelFormat).find(key => ctx.PixelFormat[key] === pixelFormat);
  texture.info += '_';
  texture.info += Object.keys(ctx.Encoding).find(key => ctx.Encoding[key] === encoding);
  return texture;
}

var texture = createTexture;

const log = browser('context/framebuffer');

function createFramebuffer(ctx, opts) {
  const gl = ctx.gl;
  const framebuffer = {
    class: 'framebuffer',
    handle: gl.createFramebuffer(),
    target: gl.FRAMEBUFFER,
    drawBuffers: [],
    color: [],
    depth: null,
    width: 0,
    height: 0,
    refCount: 0,
    _update: updateFramebuffer,
    _dispose: function () {
      gl.deleteFramebuffer(this.handle);
      this.color = null;
      this.depth = null;
    }
  };

  if (opts.color || opts.depth) {
    updateFramebuffer(ctx, framebuffer, opts);
  }

  return framebuffer;
} // opts = { color: [texture] }
// opts = { color: [texture], depth }
// opts = { color: [{texture, target}], depth }


function updateFramebuffer(ctx, framebuffer, opts) {
  const gl = ctx.gl; // TODO: if color.length > 1 check for WebGL2 or gl.getExtension('WEBGL_draw_buffers')

  framebuffer.color = opts.color.map(attachment => {
    const colorAttachment = attachment.texture ? attachment : {
      texture: attachment
    };
    colorAttachment.level = 0; // we can't render to mipmap level other than 0 in webgl

    if (!colorAttachment.target) {
      colorAttachment.target = colorAttachment.texture.target;
    }

    return colorAttachment;
  });

  if (opts.depth && !opts.depth.texture) {
    opts.depth = {
      texture: opts.depth
    };
  }

  framebuffer.depth = opts.depth;
  framebuffer.width = framebuffer.color[0].texture.width;
  framebuffer.height = framebuffer.color[0].texture.height; // TODO: ctx push framebuffer

  gl.bindFramebuffer(framebuffer.target, framebuffer.handle);
  framebuffer.drawBuffers.length = 0;

  for (let i = 0; i < framebuffer.color.length; i++) {
    const colorAttachment = framebuffer.color[i];
    framebuffer.drawBuffers.push(gl.COLOR_ATTACHMENT0 + i);
    gl.framebufferTexture2D(framebuffer.target, gl.COLOR_ATTACHMENT0 + i, colorAttachment.target, colorAttachment.texture.handle, colorAttachment.level);
  }

  for (let i = framebuffer.color.length; i < ctx.capabilities.maxColorAttachments; i++) {
    gl.framebufferTexture2D(framebuffer.target, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, null, 0);
  }

  if (framebuffer.depth) {
    if (ctx.debugMode) log('fbo attaching depth', framebuffer.depth);
    const depthAttachment = framebuffer.depth;

    if (depthAttachment.texture.target === gl.RENDERBUFFER) {
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthAttachment.texture.handle);
    } else {
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, depthAttachment.texture.target, depthAttachment.texture.handle, depthAttachment.level);
    }
  } else {
    if (ctx.debugMode) log('fbo deattaching depth');
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, null);
    gl.framebufferTexture2D(framebuffer.target, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, null, 0);
  }

  var statusStr = [];
  statusStr[gl.FRAMEBUFFER_COMPLETE] = 'FRAMEBUFFER_COMPLETE';
  statusStr[gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT] = 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT';
  statusStr[gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT] = 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT';
  statusStr[gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS] = 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS';
  statusStr[gl.FRAMEBUFFER_UNSUPPORTED] = 'FRAMEBUFFER_UNSUPPORTED';

  if (ctx.debugMode) {
    var fboStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    assert_1(fboStatus === gl.FRAMEBUFFER_COMPLETE, `FBO incomplete ${statusStr[fboStatus]}`);
  } // TODO: ctx. pop framebuffer


  gl.bindFramebuffer(framebuffer.target, null);
}

var framebuffer = createFramebuffer;

function createRenderbuffer(ctx, opts) {
  const gl = ctx.gl;
  const renderbuffer = {
    class: 'renderbuffer',
    handle: gl.createRenderbuffer(),
    target: gl.RENDERBUFFER,
    width: 0,
    height: 0,
    _update: updateRenderbuffer,
    _dispose: function () {
      gl.deleteRenderbuffer(this.handle);
      this.color = null;
      this.depth = null;
    }
  };
  updateRenderbuffer(ctx, renderbuffer, opts);
  return renderbuffer;
} // opts = { width: int, height: int, pixelFormat: PixelFormat }


function updateRenderbuffer(ctx, renderbuffer, opts) {
  Object.assign(renderbuffer, opts);
  const gl = ctx.gl;
  assert_1(renderbuffer.pixelFormat === ctx.PixelFormat.Depth16, 'Only PixelFormat.Depth16 is supported for renderbuffers');
  renderbuffer.format = gl.DEPTH_COMPONENT16;
  gl.bindRenderbuffer(renderbuffer.target, renderbuffer.handle);
  gl.renderbufferStorage(renderbuffer.target, renderbuffer.format, renderbuffer.width, renderbuffer.height);
  gl.bindRenderbuffer(renderbuffer.target, null);
}

var renderbuffer = createRenderbuffer;

const allowedProps$1 = ['name', 'framebuffer', 'color', 'depth', 'clearColor', 'clearDepth'];

function createPass(ctx, opts) {
  checkProps_1(allowedProps$1, opts);
  const pass = {
    class: 'pass',
    opts: opts,
    // framebuffer: opts.framebuffer,
    clearColor: opts.clearColor,
    clearDepth: opts.clearDepth,
    _dispose: function () {
      this.opts = null;
      this.clearColor = null;
      this.clearDepth = null;

      if (this.framebuffer === ctx.defaultState.pass.sharedFramebuffer) {
        if (--ctx.defaultState.pass.sharedFramebuffer.refCount === 0) {
          ctx.defaultState.pass.sharedFramebuffer._dispose();

          ctx.defaultState.pass.sharedFramebuffer = null;
        }
      }

      this.framebuffer = null;
    }
  };

  if (opts.color || opts.depth) {
    if (!ctx.defaultState.pass.sharedFramebuffer) {
      ctx.defaultState.pass.sharedFramebuffer = ctx.framebuffer({});
    }

    pass.framebuffer = ctx.defaultState.pass.sharedFramebuffer;
    ctx.defaultState.pass.sharedFramebuffer.refCount++;
  } // default screen framebuffer


  if (!pass.framebuffer) {
    pass.framebuffer = ctx.defaultState.pass.framebuffer;
  }

  return pass;
}

var pass = createPass;

const allowedProps$2 = ['vert', 'frag', 'program', 'depthWrite', 'depthTest', 'depthFunc', 'blend', 'blendSrcRGBFactor', 'blendSrcAlphaFactor', 'blendDstRGBFactor', 'blendDstAlphaFactor', 'cullFace', 'cullFaceMode', 'colorMask', 'primitive'];

function createPipeline(ctx, opts) {
  checkProps_1(allowedProps$2, opts);
  const pipeline = Object.assign({
    class: 'pipeline',
    vert: null,
    frag: null,
    program: null,
    depthWrite: true,
    depthTest: false,
    depthFunc: ctx.DepthFunc.LessEqual,
    blend: false,
    blendSrcRGBFactor: ctx.BlendFactor.One,
    blendSrcAlphaFactor: ctx.BlendFactor.One,
    blendDstRGBFactor: ctx.BlendFactor.One,
    blendDstAlphaFactor: ctx.BlendFactor.One,
    cullFace: false,
    cullFaceMode: ctx.Face.Back,
    colorMask: [true, true, true, true],
    primitive: ctx.Primitive.Triangles,
    _dispose: function () {
      this.vert = null;
      this.frag = null;

      if (this.program && --this.program.refCount === 0 && this.program.handle) {
        ctx.dispose(this.program);
      }

      this.program = null;
    }
  }, opts);

  if (opts.vert && opts.frag) {
    pipeline.program = ctx.program({
      vert: opts.vert,
      frag: opts.frag
    });
  }

  if (pipeline.program && !pipeline.vertexLayout) {
    pipeline.program.refCount++;
    const attributesPerLocation = pipeline.program.attributesPerLocation;
    pipeline.vertexLayout = Object.keys(attributesPerLocation).map(location => {
      const attribute = attributesPerLocation[location];
      return [attribute.name, parseInt(location, 10), attribute.size];
    });
  }

  return pipeline;
}

var pipeline = createPipeline;

const log$1 = browser('context/program');

function createProgram(ctx, opts) {
  const gl = ctx.gl;
  const program = {
    class: 'program',
    handle: gl.createProgram(),
    attributes: [],
    attributesPerLocation: {},
    uniforms: {},
    refCount: 0,
    _update: updateProgram,
    _dispose: function () {
      gl.deleteProgram(this.handle);
      this.handle = null;
      this.attributes = null;
      this.attributesPerLocation = null;
      this.uniforms = null;
    },
    setUniform: function (name, value) {
      const uniform = this.uniforms[name];

      if (uniform === undefined) {
        throw new Error(`Uniform ${name} is not defined`);
      }

      const gl = ctx.gl;
      const type = uniform.type;
      const location = uniform.location;

      switch (uniform.type) {
        case gl.INT:
          gl.uniform1i(location, value);
          break;

        case gl.BOOL:
          gl.uniform1i(location, value);
          break;

        case gl.FLOAT:
          gl.uniform1f(location, value);
          break;

        case gl.FLOAT_VEC2:
          gl.uniform2fv(location, value);
          break;

        case gl.FLOAT_VEC3:
          gl.uniform3fv(location, value);
          break;

        case gl.FLOAT_VEC4:
          gl.uniform4fv(location, value);
          break;

        case gl.FLOAT_MAT2:
          gl.uniformMatrix2fv(location, false, value);
          break;

        case gl.FLOAT_MAT3:
          gl.uniformMatrix3fv(location, false, value);
          break;

        case gl.FLOAT_MAT4:
          gl.uniformMatrix4fv(location, false, value);
          break;

        case gl.SAMPLER_2D:
          gl.uniform1i(location, value);
          break;

        case gl.SAMPLER_CUBE:
          gl.uniform1i(location, value);
          break;

        default:
          throw new Error(`Invalid uniform type ${type} : ${ctx.getGLString(type)}`);
      }
    }
  };
  updateProgram(ctx, program, opts);
  return program;
}

function updateProgram(ctx, program, opts) {
  assert_1(typeof opts.vert === 'string', 'Vertex shader source must be a string');
  assert_1(typeof opts.frag === 'string', 'Fragment shader source must be a string');
  const gl = ctx.gl;
  const vertShader = compileSource(ctx, program, gl.VERTEX_SHADER, opts.vert);
  const fragShader = compileSource(ctx, program, gl.FRAGMENT_SHADER, opts.frag); // TODO: implement custom vertex layouts
  // gl.bindAttribLocation(program, location, attributeName)

  gl.attachShader(program.handle, vertShader);
  gl.attachShader(program.handle, fragShader);
  gl.linkProgram(program.handle);

  if (!gl.getProgramParameter(program.handle, gl.LINK_STATUS)) {
    throw new Error('Program: ' + gl.getProgramInfoLog(program.handle));
  }

  gl.deleteShader(vertShader);
  gl.deleteShader(fragShader);
  updateUniforms(ctx, program);
  updateAttributes(ctx, program);
}

function compileSource(ctx, program, type, src) {
  const gl = ctx.gl;
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src + '\n');
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const shaderType = type === gl.VERTEX_SHADER ? 'Vertex' : 'Fragment';
    log$1(shaderType + ' shader compilation failed');
    log$1(src);
    throw new Error(shaderType + ' shader error: ' + gl.getShaderInfoLog(shader));
  }

  return shader;
}

function updateUniforms(ctx, program) {
  const gl = ctx.gl;
  program.uniforms = {};
  const numUniforms = gl.getProgramParameter(program.handle, gl.ACTIVE_UNIFORMS);

  for (let i = 0; i < numUniforms; ++i) {
    const info = gl.getActiveUniform(program.handle, i);
    const name = info.name;
    let size = 0;

    switch (info.type) {
      case gl.INT:
        size = 1;
        break;

      case gl.BOOL:
        size = 1;
        break;

      case gl.FLOAT:
        size = 1;
        break;

      case gl.FLOAT_VEC2:
        size = 2;
        break;

      case gl.FLOAT_VEC3:
        size = 3;
        break;

      case gl.FLOAT_VEC4:
        size = 4;
        break;

      case gl.FLOAT_MAT2:
        size = 4;
        break;

      case gl.FLOAT_MAT3:
        size = 9;
        break;

      case gl.FLOAT_MAT4:
        size = 16;
        break;

      case gl.SAMPLER_2D:
        size = 0;
        break;

      case gl.SAMPLER_CUBE:
        size = 0;
        break;

      default:
        throw new Error(`Unknwon attribute type ${info.type} : ${ctx.getGLString(info.type)}`);
    }

    program.uniforms[name] = {
      name: name,
      type: info.type,
      size: size,
      location: gl.getUniformLocation(program.handle, name)
    };

    if (info.size > 1) {
      for (let j = 1; j < info.size; j++) {
        const indexedName = info.name.substr(0, info.name.indexOf('[') + 1) + j + ']';
        program.uniforms[indexedName] = {
          type: info.type,
          location: gl.getUniformLocation(program.handle, indexedName)
        };
      }
    }
  }
}

function updateAttributes(ctx, program) {
  const gl = ctx.gl;
  program.attributes = {};
  program.attributesPerLocation = {};
  const numAttributes = gl.getProgramParameter(program.handle, gl.ACTIVE_ATTRIBUTES);

  for (let i = 0; i < numAttributes; ++i) {
    const info = gl.getActiveAttrib(program.handle, i);
    const name = info.name;
    let size = 0;

    switch (info.type) {
      case gl.FLOAT:
        size = 1;
        break;

      case gl.FLOAT_VEC2:
        size = 2;
        break;

      case gl.FLOAT_VEC3:
        size = 3;
        break;

      case gl.FLOAT_VEC4:
        size = 4;
        break;

      case gl.FLOAT_MAT4:
        size = 16;
        break;

      default:
        throw new Error(`Unknwon attribute type ${info.type} : ${ctx.getGLString(info.type)}`);
    }

    const attrib = {
      name: name,
      type: info.type,
      size: size,
      location: gl.getAttribLocation(program.handle, name)
    };
    program.attributes[name] = attrib;
    program.attributesPerLocation[attrib.location] = attrib;
  }
}

var program = createProgram;

const allowedProps$3 = ['target', 'data', 'usage', 'type', 'offset'];

function createBuffer(ctx, opts) {
  const gl = ctx.gl;
  checkProps_1(allowedProps$3, opts);
  assert_1(opts.target === gl.ARRAY_BUFFER || opts.target === gl.ELEMENT_ARRAY_BUFFER, 'Invalid buffer target');
  let className = opts.target === gl.ARRAY_BUFFER ? 'vertexBuffer' : 'indexBuffer';
  const buffer = {
    class: className,
    handle: gl.createBuffer(),
    target: opts.target,
    usage: opts.usage || gl.STATIC_DRAW,
    _update: updateBuffer,
    _dispose: function () {
      gl.deleteBuffer(this.handle);
      this.handle = null;
    }
  };
  updateBuffer(ctx, buffer, opts);
  return buffer;
}

function updateBuffer(ctx, buffer, opts) {
  checkProps_1(allowedProps$3, opts);
  const gl = ctx.gl;
  let data = opts.data || opts;
  let type = opts.type || buffer.type;
  let offset = opts.offset || 0;

  if (Array.isArray(data)) {
    if (!type) {
      if (opts.target === gl.ARRAY_BUFFER) {
        type = ctx.DataType.Float32;
      }

      if (opts.target === gl.ELEMENT_ARRAY_BUFFER) {
        type = ctx.DataType.Uint16;
      }
    }

    var sourceData = data;
    var elemSize = Array.isArray(sourceData[0]) ? sourceData[0].length : 1;
    var size = elemSize * sourceData.length;

    if (type === ctx.DataType.Float32) {
      data = new Float32Array(elemSize === 1 ? sourceData : size);
    } else if (type === ctx.DataType.Uint8) {
      data = new Uint8Array(elemSize === 1 ? sourceData : size);
    } else if (type === ctx.DataType.Uint16) {
      data = new Uint16Array(elemSize === 1 ? sourceData : size);
    } else if (type === ctx.DataType.Uint32) {
      data = new Uint32Array(elemSize === 1 ? sourceData : size);
    }

    if (elemSize > 1) {
      for (var i = 0; i < sourceData.length; i++) {
        for (var j = 0; j < elemSize; j++) {
          var index = i * elemSize + j;
          data[index] = sourceData[i][j];
        }
      }
    }
  } else if (data instanceof Float32Array) {
    type = ctx.DataType.Float32;
  } else if (data instanceof Uint8Array) {
    type = ctx.DataType.Uint8;
  } else if (data instanceof Uint16Array) {
    type = ctx.DataType.Uint16;
  } else if (data instanceof Uint32Array) {
    type = ctx.DataType.Uint32;
  } else if (data instanceof ArrayBuffer) ; else {
    throw new Error(`Unknown buffer data type: ${data.constructor}`);
  }

  buffer.type = type; // TODO: is this a valid guess?

  buffer.length = data.length; // TODO: push state, and pop as this can modify existing VBO?

  gl.bindBuffer(buffer.target, buffer.handle);

  if (offset) {
    gl.bufferSubData(buffer.target, offset, data);
  } else {
    gl.bufferData(buffer.target, data, buffer.usage);
  }
}

var buffer = createBuffer;

const allowedProps$4 = ['target'];

function createQuery(ctx, opts) {
  const gl = ctx.gl;
  opts = opts || {};
  checkProps_1(allowedProps$4, opts);
  const query = Object.assign({
    class: 'query',
    handle: gl.createQuery(),
    target: null,
    state: ctx.QueryState.Ready,
    result: null,
    _begin: begin,
    _end: end,
    _available: available,
    _dispose: function () {
      gl.deleteQuery(this.handle);
      this.handle = null;
    }
  }, opts);

  if (!query.target) {
    query.target = ctx.QueryTarget.TimeElapsed;
  }

  return query;
}

function begin(ctx, q) {
  if (q.state !== ctx.QueryState.Ready) return false;
  ctx.gl.beginQuery(q.target, q.handle);
  q.state = ctx.QueryState.Active;
  q.result = null;
  return true;
}

function end(ctx, q) {
  if (q.state !== ctx.QueryState.Active) return false;
  ctx.gl.endQuery(q.target);
  q.state = ctx.QueryState.Pending;
  return true;
}

function available(ctx, q) {
  var available = ctx.gl.getQueryObject(q.handle, ctx.gl.QUERY_RESULT_AVAILABLE);

  if (available) {
    q.result = ctx.gl.getQueryObject(q.handle, ctx.gl.QUERY_RESULT);
    q.state = ctx.QueryState.Ready;
    return true;
  } else {
    return false;
  }
}

var query = createQuery;

const log$2 = browser('context');
let ID = 0;
const allowedCommandProps = ['name', 'pass', 'pipeline', 'uniforms', 'attributes', 'indices', 'count', 'instances', 'viewport', 'scissor'];

function createContext(opts) {
  assert_1(!opts || typeof opts === 'object', 'pex-context: createContext requires opts argument to be null or an object');
  let gl = null;
  const defaultOpts = {
    pixelRatio: 1
  };
  opts = Object.assign({}, defaultOpts, opts);

  if (opts.pixelRatio) {
    opts = Object.assign(opts, {
      pixelRatio: Math.min(opts.pixelRatio, window.devicePixelRatio)
    });
  }

  if (!opts || !opts.gl) gl = indexBrowser(opts);else if (opts && opts.gl) gl = opts.gl;
  assert_1(gl, 'pex-context: createContext failed');
  const capabilities = {
    maxColorAttachments: 1,
    maxTextureImageUnits: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
    maxVertexTextureImageUnits: gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    maxCubeMapTextureSize: gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
    instancedArrays: false,
    instancing: false,
    // TODO: deprecate
    elementIndexUint32: !!gl.getExtension('OES_element_index_uint'),
    standardDerivatives: !!gl.getExtension('OES_standard_derivatives'),
    depthTexture: !!gl.getExtension('WEBGL_depth_texture'),
    shaderTextureLod: !!gl.getExtension('EXT_shader_texture_lod'),
    textureFloat: !!gl.getExtension('OES_texture_float'),
    textureFloatLinear: !!gl.getExtension('OES_texture_float_linear'),
    textureHalfFloat: !!gl.getExtension('OES_texture_half_float'),
    textureHalfFloatLinear: !!gl.getExtension('OES_texture_half_float_linear'),
    textureFilterAnisotropic: !!gl.getExtension('EXT_texture_filter_anisotropic')
  };

  if (!gl.HALF_FLOAT) {
    const ext = gl.getExtension('OES_texture_half_float');

    if (ext) {
      gl.HALF_FLOAT = ext.HALF_FLOAT_OES;
    }
  }

  if (!gl.createQuery) {
    const ext = gl.getExtension('EXT_disjoint_timer_query');

    if (!ext) {
      gl.TIME_ELAPSED = 'TIME_ELAPSED';
      gl.QUERY_RESULT_AVAILABLE = 'QUERY_RESULT_AVAILABLE';
      gl.GPU_DISJOINT = 'GPU_DISJOINT';
      gl.QUERY_RESULT = 'QUERY_RESULT';

      gl.createQuery = function () {
        return {};
      };

      gl.deleteQuery = function () {};

      gl.beginQuery = function () {};

      gl.endQuery = function () {};

      gl.getQueryObject = function (q, param) {
        if (param === gl.QUERY_RESULT_AVAILABLE) return true;
        if (param === gl.QUERY_RESULT) return 0;
        return undefined;
      };
    } else {
      gl.TIME_ELAPSED = ext.TIME_ELAPSED_EXT;
      gl.QUERY_RESULT_AVAILABLE = ext.QUERY_RESULT_AVAILABLE_EXT;
      gl.GPU_DISJOINT = ext.GPU_DISJOINT_EXT;
      gl.QUERY_RESULT = ext.QUERY_RESULT_EXT;
      gl.createQuery = ext.createQueryEXT.bind(ext);
      gl.deleteQuery = ext.deleteQueryEXT.bind(ext);
      gl.beginQuery = ext.beginQueryEXT.bind(ext);
      gl.endQuery = ext.endQueryEXT.bind(ext);
      gl.getQueryObject = ext.getQueryObjectEXT.bind(ext);
    }
  }

  const BlendFactor = {
    One: gl.ONE,
    Zero: gl.ZERO,
    SrcAlpha: gl.SRC_ALPHA,
    OneMinusSrcAlpha: gl.ONE_MINUS_SRC_ALPHA,
    DstAlpha: gl.DST_ALPHA,
    OneMinusDstAlpha: gl.ONE_MINUS_DST_ALPHA,
    SrcColor: gl.SRC_COLOR,
    OneMinusSrcColor: gl.ONE_MINUS_SRC_COLOR,
    DstColor: gl.DST_COLOR,
    OneMinusDstColor: gl.ONE_MINUS_DST_COLOR
  };
  const CubemapFace = {
    PositiveX: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
    NegativeX: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
    PositiveY: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
    NegativeY: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
    PositiveZ: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
    NegativeZ: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
  };
  const DepthFunc = {
    Never: gl.NEVER,
    Less: gl.LESS,
    Equal: gl.EQUAL,
    LessEqual: gl.LEQUAL,
    Greater: gl.GREATER,
    NotEqual: gl.NOTEQUAL,
    GreaterEqual: gl.GEQUAL,
    Always: gl.ALWAYS
  };
  const DataType = {
    Float32: gl.FLOAT,
    Uint8: gl.UNSIGNED_BYTE,
    Uint16: gl.UNSIGNED_SHORT,
    Uint32: gl.UNSIGNED_INT
  };
  const Face = {
    Front: gl.FRONT,
    Back: gl.BACK,
    FrontAndBack: gl.FRONT_AND_BACK
  };
  const Filter = {
    Nearest: gl.NEAREST,
    Linear: gl.LINEAR,
    NearestMipmapNearest: gl.NEAREST_MIPMAP_NEAREST,
    NearestMipmapLinear: gl.NEAREST_MIPMAP_LINEAR,
    LinearMipmapNearest: gl.LINEAR_MIPMAP_NEAREST,
    LinearMipmapLinear: gl.LINEAR_MIPMAP_LINEAR
  };
  const PixelFormat = {
    RGBA8: 'rgba8',
    // gl.RGBA + gl.UNSIGNED_BYTE
    RGBA32F: 'rgba32f',
    // gl.RGBA + gl.FLOAT
    RGBA16F: 'rgba16f',
    // gl.RGBA + gl.HALF_FLOAT
    R32F: 'r32f',
    // gl.ALPHA + gl.FLOAT
    R16F: 'r16f',
    // gl.ALPHA + gl.HALF_FLOAT
    Depth: 'depth',
    // gl.DEPTH_COMPONENT + gl.UNSIGNED_SHORT
    Depth16: 'depth16',
    // gl.DEPTH_COMPONENT16 in renderbuffers, gl.DEPTH_COMPONENT + gl.UNSIGNED_SHORT
    Depth24: 'depth24' // gl.DEPTH_COMPONENT + gl.UNSIGNED_INT

  };
  const Encoding = {
    Linear: 1,
    Gamma: 2,
    SRGB: 3,
    RGBM: 4
  };
  const Primitive = {
    Points: gl.POINTS,
    Lines: gl.LINES,
    LineStrip: gl.LINE_STRIP,
    Triangles: gl.TRIANGLES,
    TriangleStrip: gl.TRIANGLE_STRIP
  };
  const Usage = {
    StaticDraw: gl.STATIC_DRAW,
    DynamicDraw: gl.DYNAMIC_DRAW,
    StreamDraw: gl.STREAM_DRAW
  };
  const Wrap = {
    ClampToEdge: gl.CLAMP_TO_EDGE,
    Repeat: gl.REPEAT
  };
  const QueryTarget = {
    TimeElapsed: gl.TIME_ELAPSED
  };
  const QueryState = {
    Ready: 'ready',
    Active: 'active',
    Pending: 'pending'
  };
  const ctx = {
    gl: gl,
    BlendFactor: BlendFactor,
    CubemapFace: CubemapFace,
    DataType: DataType,
    DepthFunc: DepthFunc,
    Face: Face,
    Filter: Filter,
    PixelFormat: PixelFormat,
    Encoding: Encoding,
    Primitive: Primitive,
    Usage: Usage,
    Wrap: Wrap,
    QueryTarget: QueryTarget,
    QueryState: QueryState
  };
  const defaultState = {
    pass: {
      framebuffer: {
        target: gl.FRAMEBUFFER,
        handle: null,
        width: gl.drawingBufferWidth,
        height: gl.drawingBufferHeight
      },
      clearColor: [0, 0, 0, 1],
      clearDepth: 1
    },
    pipeline: pipeline(ctx, {}),
    viewport: [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight],
    scissor: null,
    count: 0
  }; // extensions

  if (!gl.drawElementsInstanced) {
    const ext = gl.getExtension('ANGLE_instanced_arrays');

    if (!ext) {
      // TODO: this._caps[CAPS_INSTANCED_ARRAYS] = false;
      gl.drawElementsInstanced = function () {
        throw new Error('gl.drawElementsInstanced not available. ANGLE_instanced_arrays not supported');
      };

      gl.drawArraysInstanced = function () {
        throw new Error('gl.drawArraysInstanced not available. ANGLE_instanced_arrays not supported');
      };

      gl.vertexAttribDivisor = function () {
        throw new Error('gl.vertexAttribDivisor not available. ANGLE_instanced_arrays not supported');
      };
    } else {
      // TODO: this._caps[CAPS_INSTANCED_ARRAYS] = true;
      gl.drawElementsInstanced = ext.drawElementsInstancedANGLE.bind(ext);
      gl.drawArraysInstanced = ext.drawArraysInstancedANGLE.bind(ext);
      gl.vertexAttribDivisor = ext.vertexAttribDivisorANGLE.bind(ext);
      capabilities.instancedArrays = true;
      capabilities.instancing = true; // TODO: deprecate
    }
  } else {
    capabilities.instancedArrays = true;
    capabilities.instancing = true; // TODO: deprecate
  }

  if (!gl.drawBuffers) {
    const ext = gl.getExtension('WEBGL_draw_buffers');

    if (!ext) {
      gl.drawBuffers = function () {
        throw new Error('WEBGL_draw_buffers not supported');
      };
    } else {
      gl.drawBuffers = ext.drawBuffersWEBGL.bind(ext);
      capabilities.maxColorAttachments = gl.getParameter(ext.MAX_COLOR_ATTACHMENTS_WEBGL);
    }
  } else {
    capabilities.maxColorAttachments = gl.getParameter('MAX_COLOR_ATTACHMENTS');
  }

  log$2('capabilities', capabilities);
  Object.assign(ctx, {
    debugMode: false,
    capabilities: capabilities,
    // debugGraph: '',
    debugCommands: [],
    resources: [],
    stats: [],
    queries: [],
    stack: [defaultState],
    defaultState: defaultState,
    pixelRatio: opts.pixelRatio || 1,
    state: {
      pass: {
        framebuffer: defaultState.pass.framebuffer
      },
      pipeline: pipeline(ctx, {}),
      activeTextures: [],
      activeAttributes: []
    },
    getGLString: function (glEnum) {
      let str = '';

      for (let key in gl) {
        if (gl[key] === glEnum) str = key;
      }

      if (!str) {
        str = 'UNDEFINED';
      }

      return str;
    },
    set: function (opts) {
      assert_1(client, 'changing resolution is not supported in Plask');

      if (opts.pixelRatio) {
        this.updatePixelRatio = Math.min(opts.pixelRatio, window.devicePixelRatio);
      }

      if (opts.width) {
        this.updateWidth = opts.width;
      }

      if (opts.height) {
        this.updateHeight = opts.height;
      }
    },
    debug: function (enabled) {
      this.debugMode = enabled;

      if (enabled) {
        this.debugCommands = [];
      }
    },
    checkError: function () {
      if (this.debugMode) {
        var error = gl.getError();

        if (error) {
          this.debugMode = false; // prevents rolling errors

          log$2('State', this.state.state);
          throw new Error(`GL error ${error} : ${this.getGLString(error)}`);
        }
      }
    },
    resource: function (res) {
      res.id = res.class + '_' + ID++;

      if (!this.stats[res.class]) {
        this.stats[res.class] = {
          alive: 0,
          total: 0
        };
      }

      this.stats[res.class].alive++;
      this.stats[res.class].total++;
      this.resources.push(res);
      this.checkError();
      return res;
    },
    // texture2D({ data: TypedArray, width: Int, height: Int, format: PixelFormat, flipY: Boolean })
    texture2D: function (opts) {
      log$2('texture2D', opts);
      opts.target = gl.TEXTURE_2D;
      return this.resource(texture(this, opts));
    },
    // textureCube({ data: [negxData, negyData,...], width: Int, height: Int, format: PixelFormat, flipY: Boolean })
    textureCube: function (opts) {
      log$2('textureCube', opts);
      opts.target = gl.TEXTURE_CUBE_MAP;
      return this.resource(texture(this, opts));
    },
    // framebuffer({ color: [ Texture2D, .. ], depth: Texture2D }
    // framebuffer({ color: [ { texture: Texture2D, target: Enum, level: int }, .. ], depth: { texture: Texture2D }})
    framebuffer: function (opts) {
      log$2('framebuffer', opts);
      return this.resource(framebuffer(this, opts));
    },
    // renderbuffer({ width: int, height: int })
    renderbuffer: function (opts) {
      log$2('renderbuffer', opts);
      return this.resource(renderbuffer(this, opts));
    },
    // TODO: Should we have named versions or generic 'ctx.buffer' command?
    // In regl buffer() is ARRAY_BUFFER (aka VertexBuffer) and elements() is ELEMENT_ARRAY_BUFFER
    // Now in WebGL2 we get more types Uniform, TransformFeedback, Copy
    // Possible options: {
    //    data: Array or ArrayBuffer
    //    type: 'float', 'uint16' etc
    // }
    vertexBuffer: function (opts) {
      log$2('vertexBuffer', opts);

      if (opts.length) {
        opts = {
          data: opts
        };
      }

      opts.target = gl.ARRAY_BUFFER;
      return this.resource(buffer(this, opts));
    },
    indexBuffer: function (opts) {
      log$2('indexBuffer', opts);

      if (opts.length) {
        opts = {
          data: opts
        };
      }

      opts.target = gl.ELEMENT_ARRAY_BUFFER;
      return this.resource(buffer(this, opts));
    },
    program: function (opts) {
      log$2('program', opts);
      return this.resource(program(this, opts));
    },
    pipeline: function (opts) {
      log$2('pipeline', opts);
      return this.resource(pipeline(this, opts));
    },
    pass: function (opts) {
      log$2('pass', opts, opts.color ? opts.color.map(c => c.texture ? c.texture.info : c.info) : '');
      return this.resource(pass(this, opts));
    },
    query: function (opts) {
      log$2('query', opts);
      return this.resource(query(this, opts));
    },
    beginQuery: function (q) {
      assert_1(!this.activeQuery, 'Only one query can be active at the time');

      if (q._begin(this, q)) {
        this.activeQuery = q;
      }
    },
    endQuery: function (q) {
      if (q._end(this, q)) {
        this.queries.push(q);
        this.activeQuery = null;
      }
    },
    readPixels: function (opts) {
      const x = opts.x || 0;
      const y = opts.y || 0;
      const width = opts.width;
      const height = opts.height;
      const format = gl.RGBA;
      const type = gl.UNSIGNED_BYTE;
      let pixels = null;
      pixels = new Uint8Array(width * height * 4);
      gl.readPixels(x, y, width, height, format, type, pixels);
      return pixels;
    },
    // update(texture, { data: TypeArray, [width: Int, height: Int] })
    // update(texture, { data: TypedArray })
    update: function (resource, opts) {
      if (this.debugMode) log$2('update', {
        resource: resource,
        opts: opts
      });

      resource._update(this, resource, opts);
    },
    // TODO: i don't like this inherit flag
    mergeCommands: function (parent, cmd, inherit) {
      // copy old state so we don't modify it's internals
      const newCmd = Object.assign({}, parent);

      if (!inherit) {
        // clear values are not merged as they are applied only in the parent command
        newCmd.pass = Object.assign({}, parent.pass);
        newCmd.pass.clearColor = undefined;
        newCmd.pass.clearDepth = undefined;
      } // overwrite properties from new command


      Object.assign(newCmd, cmd); // set viewport to FBO sizes when rendering to a texture

      if (!cmd.viewport && cmd.pass && cmd.pass.opts.color) {
        let tex = null;

        if (cmd.pass.opts.color[0]) {
          tex = cmd.pass.opts.color[0].texture || cmd.pass.opts.color[0];
        }

        if (cmd.pass.opts.depth) {
          tex = cmd.pass.opts.depth.texture || cmd.pass.opts.depth;
        }

        if (tex) {
          newCmd.viewport = [0, 0, tex.width, tex.height];
        }
      } // merge uniforms


      newCmd.uniforms = parent.uniforms || cmd.uniforms ? Object.assign({}, parent.uniforms, cmd.uniforms) : null;
      return newCmd;
    },
    applyPass: function (pass) {
      const gl = this.gl;
      const state = this.state; // if (pass.framebuffer !== state.framebuffer) {

      if (state.pass.id !== pass.id) {
        if (this.debugMode) log$2('change framebuffer', state.pass.framebuffer, '->', pass.framebuffer);
        state.pass = pass;

        if (pass.framebuffer._update) {
          // rebind pass' color and depth to shared FBO
          this.update(pass.framebuffer, pass.opts);
        }

        gl.bindFramebuffer(pass.framebuffer.target, pass.framebuffer.handle);

        if (pass.framebuffer.drawBuffers && pass.framebuffer.drawBuffers.length > 1) {
          gl.drawBuffers(pass.framebuffer.drawBuffers);
        }
      }

      let clearBits = 0;

      if (pass.clearColor !== undefined) {
        if (this.debugMode) log$2('clearing color', pass.clearColor);
        clearBits |= gl.COLOR_BUFFER_BIT; // TODO this might be unnecesary but we don't know because we don't store the clearColor in state

        gl.clearColor(pass.clearColor[0], pass.clearColor[1], pass.clearColor[2], pass.clearColor[3]);
      }

      if (pass.clearDepth !== undefined) {
        if (this.debugMode) log$2('clearing depth', pass.clearDepth);
        clearBits |= gl.DEPTH_BUFFER_BIT;

        if (!state.depthWrite) {
          state.depthWrite = true;
          gl.depthMask(true);
        } // TODO this might be unnecesary but we don't know because we don't store the clearDepth in state


        gl.clearDepth(pass.clearDepth);
      }

      if (clearBits) {
        gl.clear(clearBits);
      }

      this.checkError();
    },
    applyPipeline: function (pipeline) {
      const gl = this.gl;
      const state = this.state;

      if (pipeline.depthWrite !== state.depthWrite) {
        state.depthWrite = pipeline.depthWrite;
        gl.depthMask(state.depthWrite);
      }

      if (pipeline.depthTest !== state.depthTest) {
        state.depthTest = pipeline.depthTest;
        state.depthTest ? gl.enable(gl.DEPTH_TEST) : gl.disable(gl.DEPTH_TEST);
      }

      if (pipeline.depthFunc !== state.depthFunc) {
        state.depthFunc = pipeline.depthFunc;
        gl.depthFunc(state.depthFunc);
      }

      if (pipeline.blend !== state.blend || pipeline.blendSrcRGBFactor !== state.blendSrcRGBFactor || pipeline.blendSrcAlphaFactor !== state.blendSrcAlphaFactor || pipeline.blendDstRGBFactor !== state.blendDstRGBFactor || pipeline.blendDstAlphaFactor !== state.blendDstAlphaFactor) {
        state.blend = pipeline.blend;
        state.blendSrcRGBFactor = pipeline.blendSrcRGBFactor;
        state.blendSrcAlphaFactor = pipeline.blendSrcAlphaFactor;
        state.blendDstRGBFactor = pipeline.blendDstRGBFactor;
        state.blendDstAlphaFactor = pipeline.blendDstAlphaFactor;
        state.blend ? gl.enable(gl.BLEND) : gl.disable(gl.BLEND);
        gl.blendFuncSeparate(state.blendSrcRGBFactor, state.blendDstRGBFactor, state.blendSrcAlphaFactor, state.blendDstAlphaFactor);
      }

      if (pipeline.cullFace !== state.cullFace || pipeline.cullFaceMode !== state.cullFaceMode) {
        state.cullFace = pipeline.cullFace;
        state.cullFaceMode = pipeline.cullFaceMode;
        state.cullFace ? gl.enable(gl.CULL_FACE) : gl.disable(gl.CULL_FACE);

        if (state.cullFace) {
          gl.cullFace(state.cullFaceMode);
        }
      }

      if (pipeline.colorMask[0] !== state.pipeline.colorMask[0] || pipeline.colorMask[1] !== state.pipeline.colorMask[1] || pipeline.colorMask[2] !== state.pipeline.colorMask[2] || pipeline.colorMask[3] !== state.pipeline.colorMask[3]) {
        state.pipeline.colorMask[0] = pipeline.colorMask[0];
        state.pipeline.colorMask[1] = pipeline.colorMask[1];
        state.pipeline.colorMask[2] = pipeline.colorMask[2];
        state.pipeline.colorMask[3] = pipeline.colorMask[3];
        gl.colorMask(pipeline.colorMask[0], pipeline.colorMask[1], pipeline.colorMask[2], pipeline.colorMask[3]);
      }

      if (pipeline.program !== state.program) {
        state.program = pipeline.program;

        if (state.program) {
          gl.useProgram(state.program.handle);
        }
      }

      if (pipeline.vertexLayout) {
        state.vertexLayout = pipeline.vertexLayout;
      }

      this.checkError();
    },
    applyUniforms: function (uniforms, cmd) {
      const gl = this.gl;
      const state = this.state;
      let numTextures = 0;

      if (!state.program) {
        assert_1.fail('Trying to draw without an active program');
      }

      const requiredUniforms = this.debugMode ? Object.keys(state.program.uniforms) : null;

      for (var name in uniforms) {
        let value = uniforms[name]; // TODO: find a better way to not trying to set unused uniforms that might have been inherited

        if (!state.program.uniforms[name] && !state.program.uniforms[name + '[0]']) {
          continue;
        }

        if (value === null || value === undefined) {
          log$2('invalid command', cmd);
          assert_1.fail(`Can't set uniform "${name}" with a null value`);
        } // FIXME: uniform array hack


        if (Array.isArray(value) && !state.program.uniforms[name]) {
          if (this.debugMode) {
            log$2('unknown uniform', name, Object.keys(state.program.uniforms));
          }

          for (var i = 0; i < value.length; i++) {
            var nameIndex = name + '[' + i + ']';
            state.program.setUniform(nameIndex, value[i]);

            if (this.debugMode) {
              requiredUniforms.splice(requiredUniforms.indexOf(nameIndex), 1);
            }
          }
        } else if (value.target) {
          // assuming texture
          // FIXME: texture binding hack
          const slot = numTextures++;
          gl.activeTexture(gl.TEXTURE0 + slot);

          if (state.activeTextures[slot] !== value) {
            gl.bindTexture(value.target, value.handle);
            state.activeTextures[slot] = value;
          }

          state.program.setUniform(name, slot);

          if (this.debugMode) {
            requiredUniforms.splice(requiredUniforms.indexOf(name), 1);
          }
        } else if (!value.length && typeof value === 'object') {
          log$2('invalid command', cmd);
          assert_1.fail(`Can set uniform "${name}" with an Object value`);
        } else {
          state.program.setUniform(name, value);

          if (this.debugMode) {
            requiredUniforms.splice(requiredUniforms.indexOf(name), 1);
          }
        }
      }

      if (this.debugMode && requiredUniforms.length > 0) {
        log$2('invalid command', cmd);
        assert_1.fail(`Trying to draw with missing uniforms: ${requiredUniforms.join(', ')}`);
      }

      this.checkError();
    },
    drawVertexData: function (cmd) {
      const state = this.state;
      const vertexLayout = state.vertexLayout;

      if (!state.program) {
        assert_1.fail('Trying to draw without an active program');
      }

      if (this.debugMode) {
        // TODO: can vertex layout be ever different if it's derived from pipeline's shader?
        if (vertexLayout.length !== Object.keys(state.program.attributes).length) {
          log$2('Invalid vertex layout not matching the shader', vertexLayout, state.program.attributes, cmd);
          assert_1.fail('Invalid vertex layout not matching the shader');
        }
      }

      let instanced = false; // TODO: disable unused vertex array slots

      for (let i = 0; i < 16; i++) {
        state.activeAttributes[i] = null;
        gl.disableVertexAttribArray(i);
      } // TODO: the same as i support [tex] and { texture: tex } i should support buffers in attributes?


      for (let i = 0; i < vertexLayout.length; i++) {
        const layout = vertexLayout[i];
        const name = layout[0];
        const location = layout[1];
        const size = layout[2];
        const attrib = cmd.attributes[i] || cmd.attributes[name];

        if (!attrib) {
          log$2('Invalid command', cmd, "doesn't satisfy vertex layout", vertexLayout);
          assert_1.fail(`Command is missing attribute "${name}" at location ${location} with ${attrib}`);
        }

        let buffer = attrib.buffer;

        if (!buffer && attrib.class === 'vertexBuffer') {
          buffer = attrib;
        }

        if (!buffer || !buffer.target) {
          log$2('Invalid command', cmd);
          assert_1.fail(`Trying to draw arrays with invalid buffer for attribute : ${name}`);
        }

        gl.bindBuffer(buffer.target, buffer.handle);

        if (size === 16) {
          gl.enableVertexAttribArray(location + 0);
          gl.enableVertexAttribArray(location + 1);
          gl.enableVertexAttribArray(location + 2);
          gl.enableVertexAttribArray(location + 3);
          state.activeAttributes[location + 0] = buffer;
          state.activeAttributes[location + 1] = buffer;
          state.activeAttributes[location + 2] = buffer;
          state.activeAttributes[location + 3] = buffer; // we still check for buffer type because while e.g. pex-renderer would copy buffer type to attrib
          // a raw pex-context example probably would not

          gl.vertexAttribPointer(location, 4, attrib.type || buffer.type, attrib.normalized || false, attrib.stride || 64, attrib.offset || 0);
          gl.vertexAttribPointer(location + 1, 4, attrib.type || buffer.type, attrib.normalized || false, attrib.stride || 64, attrib.offset || 16);
          gl.vertexAttribPointer(location + 2, 4, attrib.type || buffer.type, attrib.normalized || false, attrib.stride || 64, attrib.offset || 32);
          gl.vertexAttribPointer(location + 3, 4, attrib.type || buffer.type, attrib.normalized || false, attrib.stride || 64, attrib.offset || 48);

          if (attrib.divisor) {
            gl.vertexAttribDivisor(location + 0, attrib.divisor);
            gl.vertexAttribDivisor(location + 1, attrib.divisor);
            gl.vertexAttribDivisor(location + 2, attrib.divisor);
            gl.vertexAttribDivisor(location + 3, attrib.divisor);
            instanced = true;
          } else if (capabilities.instancing) {
            gl.vertexAttribDivisor(location + 0, 0);
            gl.vertexAttribDivisor(location + 1, 0);
            gl.vertexAttribDivisor(location + 2, 0);
            gl.vertexAttribDivisor(location + 3, 0);
          }
        } else {
          gl.enableVertexAttribArray(location);
          state.activeAttributes[location] = buffer;
          gl.vertexAttribPointer(location, size, attrib.type || buffer.type, attrib.normalized || false, attrib.stride || 0, attrib.offset || 0);

          if (attrib.divisor) {
            gl.vertexAttribDivisor(location, attrib.divisor);
            instanced = true;
          } else if (capabilities.instancing) {
            gl.vertexAttribDivisor(location, 0);
          }
        } // TODO: how to match index with vertexLayout location?

      }

      let primitive = cmd.pipeline.primitive;

      if (cmd.indices) {
        let indexBuffer = cmd.indices.buffer;

        if (!indexBuffer && cmd.indices.class === 'indexBuffer') {
          indexBuffer = cmd.indices;
        }

        if (!indexBuffer || !indexBuffer.target) {
          log$2('Invalid command', cmd);
          assert_1.fail(`Trying to draw arrays with invalid buffer for elements`);
        }

        state.indexBuffer = indexBuffer;
        gl.bindBuffer(indexBuffer.target, indexBuffer.handle);
        var count = cmd.count || indexBuffer.length;
        var offset = cmd.indices.offset || 0;
        var type = cmd.indices.type || indexBuffer.type;

        if (instanced) {
          // TODO: check if instancing available
          gl.drawElementsInstanced(primitive, count, type, offset, cmd.instances);
        } else {
          gl.drawElements(primitive, count, type, offset);
        }
      } else if (cmd.count) {
        const first = 0;

        if (instanced) {
          gl.drawArraysInstanced(primitive, first, cmd.count, cmd.instances);
        } else {
          gl.drawArrays(primitive, first, cmd.count);
        }
      } else {
        assert_1.fail('Vertex arrays requres elements or count to draw');
      }

      this.checkError();
    },
    frame: function (cb) {
      const self = this;
      raf_1(function frame() {
        if (self.updatePixelRatio) {
          self.pixelRatio = self.updatePixelRatio; // we need to reaply width/height and update styles

          if (!self.updateWidth) {
            self.updateWidth = parseInt(gl.canvas.style.width) || gl.canvas.width;
          }

          if (!self.updateHeight) {
            self.updateHeight = parseInt(gl.canvas.style.height) || gl.canvas.height;
          }

          self.updatePixelRatio = 0;
        }

        if (self.updateWidth) {
          gl.canvas.style.width = self.updateWidth + 'px';
          gl.canvas.width = self.updateWidth * self.pixelRatio;
          self.updateWidth = 0;
        }

        if (self.updateHeight) {
          gl.canvas.style.height = self.updateHeight + 'px';
          gl.canvas.height = self.updateHeight * self.pixelRatio;
          self.updateHeight = 0;
        }

        if (self.defaultState.viewport[2] !== gl.drawingBufferWidth || self.defaultState.viewport[3] !== gl.drawingBufferHeight) {
          self.defaultState.viewport[2] = gl.drawingBufferWidth;
          self.defaultState.viewport[3] = gl.drawingBufferHeight;
          self.defaultState.pass.framebuffer.width = gl.drawingBufferWidth;
          self.defaultState.pass.framebuffer.height = gl.drawingBufferHeight;
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        }

        if (cb() === false) {
          // interrupt render loop
          return;
        }

        if (self.queries.length) {
          self.queries = self.queries.filter(q => !q._available(self, q));
        }

        raf_1(frame);
      });
    },
    // TODO: switching to lightweight resources would allow to just clone state
    // and use commands as state modifiers?
    apply: function (cmd) {
      const state = this.state;
      if (this.debugMode) log$2('apply', cmd.name || cmd.id, {
        cmd: cmd,
        state: JSON.parse(JSON.stringify(state))
      });
      this.checkError();

      if (cmd.scissor) {
        if (cmd.scissor !== state.scissor) {
          state.scissor = cmd.scissor;
          gl.enable(gl.SCISSOR_TEST);
          gl.scissor(state.scissor[0], state.scissor[1], state.scissor[2], state.scissor[3]);
        }
      } else {
        if (cmd.scissor !== state.scissor) {
          state.scissor = cmd.scissor;
          gl.disable(gl.SCISSOR_TEST);
        }
      }

      if (cmd.pass) this.applyPass(cmd.pass);
      if (cmd.pipeline) this.applyPipeline(cmd.pipeline);
      if (cmd.uniforms) this.applyUniforms(cmd.uniforms);

      if (cmd.viewport) {
        if (cmd.viewport !== state.viewport) {
          state.viewport = cmd.viewport;
          gl.viewport(state.viewport[0], state.viewport[1], state.viewport[2], state.viewport[3]);
        }
      }

      if (cmd.attributes) {
        this.drawVertexData(cmd);
      }
    },
    submit: function (cmd, batches, subCommand) {
      if (this.debugMode) {
        checkProps_1(allowedCommandProps, cmd);

        if (batches && subCommand) {
          log$2('submit', cmd.name || cmd.id, {
            depth: this.stack.length,
            cmd: cmd,
            batches: batches,
            subCommand: subCommand,
            state: this.state,
            stack: this.stack
          });
        } else if (batches) {
          log$2('submit', cmd.name || cmd.id, {
            depth: this.stack.length,
            cmd: cmd,
            batches: batches,
            state: this.state,
            stack: this.stack
          });
        } else {
          log$2('submit', cmd.name || cmd.id, {
            depth: this.stack.length,
            cmd: cmd,
            state: this.state,
            stack: this.stack
          });
        }
      }

      if (batches) {
        if (Array.isArray(batches)) {
          // TODO: quick hack
          for (let i = 0; i < batches.length; i++) {
            const batch = batches[i];
            this.submit(this.mergeCommands(cmd, batch, true), subCommand);
          }

          return;
        } else if (typeof batches === 'object') {
          this.submit(this.mergeCommands(cmd, batches, true), subCommand);
          return;
        } else {
          subCommand = batches; // shift argument
        }
      }

      const parentState = this.stack[this.stack.length - 1];
      const cmdState = this.mergeCommands(parentState, cmd, false);
      this.apply(cmdState);

      if (this.debugMode) {
        cmdState.debugId = this.debugCommands.length;
        this.debugCommands.push({
          cmd,
          cmdState,
          parentState
        });
      }

      if (subCommand) {
        if (this.debugMode) {
          this.debugGraph += `subgraph cluster_${cmd.name || cmd.id} {\n`;
          this.debugGraph += `label = "${cmd.name}"\n`;

          if (cmd.program) {
            this.debugGraph += `${cmd.program.id} -> cluster_${cmd.name || cmd.id}\n`;
          }

          if (cmd.framebuffer) {
            this.debugGraph += `${cmd.framebuffer.id} -> cluster_${cmd.name || cmd.id}\n`;

            for (let i = 0; i < cmd.framebuffer.color; i++) {
              const attachment = cmd.framebuffer.color[i];
              this.debugGraph += `${attachment.texture.id} -> ${cmd.framebuffer.id}\n`;
            }

            if (cmd.framebuffer.depth) {
              this.debugGraph += `${cmd.framebuffer.depth.texture.id} -> ${cmd.framebuffer.id}\n`;
            }
          }
        }

        this.stack.push(cmdState);
        subCommand();
        this.stack.pop();

        if (this.debugMode) {
          this.debugGraph += '}\n';
        }
      }

      this.checkError();
    },
    dispose: function (res) {
      log$2('dispose', res);
      assert_1(res || arguments.length === 0, 'Trying to dispose undefined resource');

      if (res) {
        if (!res._dispose) {
          assert_1(res._dispose, 'Trying to dispose non resource');
        }

        const idx = this.resources.indexOf(res);
        assert_1(idx !== -1, 'Trying to dispose resource from another context');
        this.resources.splice(idx, 1);
        this.stats[res.class].alive--;

        res._dispose();
      } else {
        while (this.resources.length) {
          this.dispose(this.resources[0]);
        }

        this.gl.canvas.width = 1;
        this.gl.canvas.height = 1;
      }
    }
  });
  ctx.apply(defaultState);
  return ctx;
}

var pexContext = createContext;

export default pexContext;
