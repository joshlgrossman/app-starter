TypeScript Starter Kit
==
includes:
--
 * TypeScript compilation (with TSX and decorators)
 * LESS compilation (with modules and CSS reset)
 * scoped CSS modules
 * hyperapp (including router and logger)
 * dependency injection with InversifyJS
 * unit testing with mocha/chai/sinon
 * RxJS, MonetJS and lodash for functional and reactive programming
 * axios for HTTP requests
 * date-fns for Date manipulation
 * ES6 polyfill with core-js
 * grunt + webpack (with happypack for parallel processing)
 * tslint + prettier

npm scripts:
--
`test` - runs mocha tests

`build` - builds and minifies

`build:dev` - builds with sourcemaps

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
import styles from './example.less';

export const example = (
  <div className={styles}>Example</div>
);
```

