import React from 'react';
import jsdom from 'jsdom';

export const prepareDOMEnv = (html = '<!doctype html><html><body></body></html>') => {
  if (typeof document !== 'undefined') {
    return;
  }
  const doc = jsdom.jsdom(html);
  const win = doc.defaultView;

  global.window = win;
  global.document = doc;
  global.navigator = {
    userAgent: 'JSDOM'
  };
  global.window.URL = {
    createObjectURL: (arg) => {
      return 'data://' + arg.name;
    }
  };
};

export function componentSetup(component, ...args) {
  prepareDOMEnv();
  const props = {};
  for (let i = 0; i < args.length; i++) {
    Object.assign(props, args[i]);
  }
  return React.createElement(component, { ...props });
}
