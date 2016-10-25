# React App Quickstart

- React
- Redux
- React Router
- Express
- Webpack (HMR)
- Gulp

## Usage
To get started first install yarn, then run the 'yarn' cmd.
```
$ npm i -g yarn
$ yarn
```

To get up and running after installation run gulp.
```
$ gulp  
```
The app will launch at http://localhost:3000 (default gulp task is 'dev')
Directories and ports for development can been configured in **constants.js**.

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

## Docs
You can generate a set of documents for the react application by running the following command
```
gulp esdocs
```

This will create a *docs* folder at the root of this project, open the index.html to get a view of the React applications code base.

## Contributing
For proper documentation generation @jsdocs format of commenting must be used.
For instructions on how to best utilise documentation creation with code commenting using **esdocs** please visit https://esdoc.org/.
** note: at the moment esdocs only supports testing documentation of mocha, tests will appear in the component docs where tagged, but the navigation 'test' tab not return a page.
