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

function combineProps(props) {
  const combinedProps = {};
  props.map((prop) => Object.assign(combinedProps, prop));
  return combinedProps;
}

export function componentSetup(component, ...props) {
  prepareDOMEnv();
  combineProps(props);
  return React.createElement(component, combineProps(props));
}
