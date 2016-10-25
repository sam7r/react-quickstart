# React App Quickstart 
[![Build Status](https://travis-ci.org/sam7r/reactjs-quickstart.svg)](https://travis-ci.org/sam7r/reactjs-quickstart)

- React
- Redux
- React Router
- Express
- Webpack (HMR)
- Gulp

## Usage
To get started first install some global dependencies with npm, then run 'yarn'.
```
$ npm i -g yarn babel-cli gulp
$ yarn
```

To get up and running after installation run gulp.
```
$ gulp  
```
Once this task has finished the app will be available at http://localhost:3000

Any modification to directories or ports for development can been configured in **constants.js**.

## Testing
You can initiate tests by running:
```
$ npm test
# or
$ gulp test
```

We are using:
- blue-tape (https://ci.testling.com/guide/tape)
- enzyme (http://airbnb.io/enzyme/docs/api/index.html)
- sinon (http://sinonjs.org/docs/)
- eslint (http://eslint.org/docs/rules/)

## Docs
You can generate a set of documents for the application by running the following command
```
gulp esdocs
```

This will create a *docs* folder at the root of this project, open the index.html to get a view of the React applications code base. For good auto doc generation a certain code commenting format must be adopted, see below for more info. (examples to follow soon)

## Contributing
For proper documentation generation @jsdocs format of commenting must be used.
For instructions on how to best utilise documentation creation with code commenting using **esdocs** please visit https://esdoc.org/.
** note: at the moment esdocs only supports testing documentation of mocha, tests will appear in the component docs where tagged, but the navigation 'test' tab not return a page.
