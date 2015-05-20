import jsdom from 'jsdom'

var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
var win = doc.defaultView
global.document = doc
global.window = win
propagateToGlobal(win)

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
  for (var key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) {
      if (process.env.JSDOM_VERBOSE) {
        console.warn("[jsdom] Warning: skipping cleanup of global['"+key+"']");
      }
      continue;
    }

    global[key] = window[key];
  }
}
