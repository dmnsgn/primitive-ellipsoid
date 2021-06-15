import './common/es.typed-array.uint8-array-c1f66f2e.js';
import './common/typed-array-constructor-64e99d87.js';
import './common/to-object-b740b57d.js';

function promisify(fn) {
  return function (file, cb) {
    if (cb) {
      return fn(file, cb);
    } else {
      return new Promise((resolve, reject) => {
        fn(file, (err, data) => {
          if (err) return reject(err);else resolve(data);
        });
      });
    }
  };
}

var promisify_1 = promisify;

function loadImageBrowser(opts, callback) {
  var crossOrigin = null;
  var url = opts;

  if (url.url) {
    crossOrigin = url.crossOrigin;
    url = url.url;
  }

  var img = new window.Image();

  if (crossOrigin) {
    img.crossOrigin = crossOrigin;
  }

  img.onerror = function () {
    callback(new Error('Failed to load ' + url), null);
  };

  img.onload = function () {
    callback(null, img);
  };

  img.src = url;
}
/**
 * Loads a HTML Image from an url in the borwser, SkCanvas from a file in Plask
 * @param {String} file - url addess (Browser) or file path (Plask)
 * @param {Function} callback - function(err, image) { }
 * @param {Error} callback.err - error if any or null
 * @param {Image|SkCanvas} callback.image - loaded image
 */


function loadImage(file, callback, crossOrigin) {
  {
    loadImageBrowser(file, callback);
  }
}

var loadImage_1 = promisify_1(loadImage);

function loadBinaryBrowser(url, callback) {
  var request = new window.XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onreadystatechange = function (e) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        callback(null, request.response);
      } else {
        callback(new Error('loadBinary error : ' + request.response), null);
      }
    }
  };

  request.send(null);
}
/**
 * Loads binary data
 * @param {String} file - url addess (Browser) or file path (Plask)
 * @param {Function} callback - function(err, data) { }
 * @param {Error} callback.err - error if any or null
 * @param {ArrayBuffer} callback.data - loaded binary data
 */


function loadBinary(file, callback) {
  {
    loadBinaryBrowser(file, callback);
  }
}

var loadBinary_1 = promisify_1(loadBinary);

function loadTextBrowser(url, callback) {
  var request = new window.XMLHttpRequest();
  request.open('GET', url, true);

  request.onreadystatechange = function (e) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        if (callback) {
          callback(null, request.responseText);
        }
      } else {
        callback(new Error('loadText error: ' + request.statusText), null);
      }
    }
  };

  request.send(null);
}
/**
 * @desc Loads text string
 * @param {String} file - url addess (Browser) or file path (Plask)
 * @param {Function} callback - function(err, text) { }
 * @param {Error} callback.err - error if any or null
 * @param {String} callback.text - loaded text
 */


function loadText(file, callback) {
  {
    loadTextBrowser(file, callback);
  }
}

var loadText_1 = promisify_1(loadText);

/**
 * Loads JSON data
 * @param {String} file - url addess (Browser) or file path (Plask)
 * @param {Function} callback - function(err, json) { }
 * @param {Error} callback.err - error if any or null
 * @param {String} callback.json - loaded JSON data
 */

function loadJSON(file, callback) {
  loadText_1(file, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      var json = null;

      try {
        json = JSON.parse(data);
      } catch (e) {
        return callback(e, null);
      }

      callback(null, json);
    }
  });
}

var loadJSON_1 = promisify_1(loadJSON);

/**
 * Load provided resources
 * @param   {Object} resources - map of resources, see example
 * @param   {Function} callback function(err, resources), see example
 * @returns {Object}   - with same properties are resource list but resolved to the actual data
 *
 * @example
 * var resources = {
 *   img     : { image: __dirname + '/tex.jpg'},
 *   hdrImg  : { binary: __dirname + '/tex.hdr'}
 *   data    : { json: __dirname + '/data.json'},
 *   hello   : { text: __dirname + '/hello.txt'}
 * }
 * load(resources, function(err, res) {
 *   res.img    //{Image} in a Browser or {SkCanvas} in Plask
 *   res.hdrImg //{ArrayBuffer}
 *   res.data   //{JSON}
 *   res.hello  //{String}
 * })
 */

function load(resources, callback) {
  var results = {};
  var errors = {};
  var hadErrors = false; // TODO: use `async` module instead?

  var loadedResources = 0;
  var resourceNames = Object.keys(resources);
  var numResources = resourceNames.length;

  function onFinish() {
    try {
      if (hadErrors) {
        callback(errors, null);
      } else {
        callback(null, results);
      }
    } catch (e) {
      console.log(e);
      console.log(e.stack);
    }
  }

  resourceNames.forEach(function (name) {
    function onLoaded(err, data) {
      if (err) {
        hadErrors = true;
        errors[name] = err;
      } else {
        results[name] = data;
      }

      if (++loadedResources === numResources) {
        onFinish();
      }
    }

    var res = resources[name];

    if (res.image) {
      loadImage_1(res.image, onLoaded);
    } else if (res.text) {
      loadText_1(res.text, onLoaded);
    } else if (res.json) {
      loadJSON_1(res.json, onLoaded);
    } else if (res.binary) {
      loadBinary_1(res.binary, onLoaded);
    } else {
      onLoaded(new Error('pex-io/load unknown resource type ' + Object.keys(res)), null);
    }
  });

  if (resourceNames.length === 0) {
    onFinish();
  }
}

var load_1 = promisify_1(load);

var pexIo = {
  load: load_1,
  loadBinary: loadBinary_1,
  loadImage: loadImage_1,
  loadText: loadText_1,
  loadJSON: loadJSON_1
};

export default pexIo;
var load$1 = pexIo.load;
export { pexIo as __moduleExports, load$1 as load };
