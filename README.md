App Starter Kit
==
includes:
--
 * TypeScript compilation (with TSX and decorators)
 * ES6 transpilation for JS and JSX
 * LESS compilation (with modules and CSS reset)
 * scoped CSS modules
 * hyperapp (including router and logger)
 * express with routing-controllers decorators
 * dependency injection with InversifyJS
 * unit testing with mocha/chai/sinon
 * RxJS, MonetJS and lodash for functional and reactive programming
 * axios for HTTP requests
 * date-fns for Date manipulation
 * ES6 polyfill with core-js
 * grunt + webpack/webpack-dev-server (with happypack for parallel processing)
 * tree-shaking
 * tslint/eslint + prettier

npm scripts:
--
`test` - runs mocha tests

`build` - tests and builds both client and server

`build:client` - tests, builds and minifies client

`start:client` - tests, builds and serves client with webpack-dev-server

`build:server` - tests and builds server

`start:server` - tests, builds and starts server

css modules:
--
scoped CSS modules will generate unique classnames and be injected into the HTML via `<link>` tags, these unique classnames can be imported as follows:

`example.less:`
```css
:host {
  background-color: black;
}
```
`example.tsx:`
```js
import className from './example.less';

export function ExampleComponent() {
  return <div className={className}>Example</div>;
}
```

