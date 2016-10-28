import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, match, browserHistory } from 'react-router/es';
import routes from './routes';

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

match({ routes, location }, () => {
  render(
    <Router routes={ routes } history={ browserHistory } />,
    document.querySelector('#app')
  );
});