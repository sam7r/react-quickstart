# reactjs-quickstart
[![Build Status](https://travis-ci.org/sam7r/reactjs-quickstart.svg)](https://travis-ci.org/sam7r/reactjs-quickstart)
[![dependencies Status](https://david-dm.org/sam7r/reactjs-quickstart.svg)](https://david-dm.org/sam7r/reactjs-quickstart)

- React
- Redux
- React Router
- Express
- Webpack (HMR)
- Gulp

## Getting Started
To get started first install some global dependencies with npm, then run **yarn**.
```
$ npm i -g yarn gulp

$ yarn
```

To get up and running after installation run gulp.
```
$ gulp  
```
Once this task has finished the app will be available at http://localhost:3000.  
Any modification to directories or ports for development can been configured in **constants.js**.

## Testing
You can run your tests using either gulp or npm.  
The runner is configured to pick up all files in the src dir suffixed with *.test.js*.
```
$ gulp test

$ npm test
```

Libraries in use are:
- blue-tape (https://ci.testling.com/guide/tape)
- enzyme (http://airbnb.io/enzyme/docs/api/index.html)
- sinon (http://sinonjs.org/docs/)
- eslint (http://eslint.org/docs/rules/)

## Docs
You can generate a set of documents for the application by running the following command.  
```
gulp esdocs
```

This will create a *docs* folder with the generated pages inside, to view open the *index.html* file in your browser.  
For good auto doc generation please see the esdoc guide (https://esdoc.org/tutorial.html).

## Thanks
Feel free to contribute in any way to make this project better.