import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;
global.document = doc;
global.window = win;

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) {
      if (process.env.JSDOM_VERBOSE) {
        console.warn("[jsdom] Warning: skipping cleanup of global['" + key + "']");
      }
      continue;
    }

    global[key] = window[key];
  }
}

propagateToGlobal(win);
