# rex


[![Build Status](https://travis-ci.org/nerdlabs/rex.svg?branch=master)][travis]
[![Dependency Status](https://david-dm.org/nerdlabs/rex.svg)][david]


**rex** is yet another React boilerplate. It provides a basic, but universal,
html rendering layer. As such, it isn't meant to provide an http api, but to be
deployed in front of one or more such apis. That being said, **rex** supports
mocking an api using Swagger specs for local development.


## Principles

- Keep it simple, modular and universal
- Leverage next-gen technology (JSX, TC39, CSSWG specs)


## Building Blocks

#### Babel

Using [Babel][babel], all our ECMAScript and [JSX][jsx] code in is being
transpiled to vanilla JavaScript (ES5) that is understood by NodeJS and all
proper Browsers. If you need to get to know all that nice new syntax, there is
plenty of [great][es6] [resources][katas] online.

#### Flux

[Flux][flux] is not so much a framework or module, but rather an architectural
pattern. It prescribes a unidirectional data flow that complements React view
components quite nicely.

A Flux application typically consists of a dispatcher, a couple of stores (i.e.
application state containers) and some view components. These view components
create and dispatch actions that modify the stores. Changes in stores, in turn,
trigger re-rendering of the views.

#### Redux

The [Flux][henrikflux] implementation chosen for **rex** is [Redux][redux].
Redux is billed as "a predictable state container for JavaScript apps". As such,
it consist of a single store with a dispatch function, reducers triggered by
this function and manipulating the store, and action creators providing the
actions to dispatch.

**rex** supports asynchronous actions by relying on [redux-actions][actions] and
[redux-promise][promise]. In **rex**, [routing][router] state is also integrated
with [Redux][longroute].

#### React

[React][react] is [awesome][longreact]. It is basically a view library using
JSX and providing a virtual DOM. React components are composable element types
comprising of structure/markup, functionality (e.g. data binding) and styling.

By combining a virtual DOM with a unidirectional data flow, with React it isn't
hard to build highly complex user interfaces that are extremely easy to reason
about.

#### CSSModules

From a JavaScript developer's perspective, [CSS has some issues][vjeuxcss].
[CSSModules][cssmodules] attempt to actually [solve][madderncss] some of them:
it limits the scope of css classes to the components they are applied to.

CSSModules aren't strictly tied to React or other parts of the **rex** stack,
but React and CSSModules are quite the ideal combination.


#### CSSNext

CSS evolution basically obsoletes preprocessors such as LESS, SASS and Stylus.
Using PostCSS and CSSNext, we have variables, nesting and lots of other goodies
while still writing spec compliant CSS.

Just like with Babel and JavaScript, with [CSSNext][cssnext] we are simply
transpiling, polyfilling and prefixing the modern CSS we write to support a wide
range of current browsers.


## Tooling

**rex** is keeping it simple: instead of using Grunt, Gulp or another task
runner it simply uses [npm scripts][subrun]. Instead of using Webpack with hot
module reloading and all kinds of magic, **rex** simply leverages
[Browserify][browserify] to make things [universal][mjuniversal].

#### Development mode

In development mode, every single dependency needs to be installed. Development
builds are unminified, contain source maps and produce some debug output.

```
npm install
npm start
```

#### Production Mode

For production mode, dev-dependencies don't need to be pulled in - and build
and server settings are automatically adjusted for maximum performance.

```
npm install --production
npm start --production
```


[travis]: https://travis-ci.org/nerdlabs/rex
[david]: https://david-dm.org/nerdlabs/rex

[flux]: https://facebook.github.io/flux/
[redux]: http://rackt.org/redux/
[react]: https://facebook.github.io/react/
[jsx]: https://facebook.github.io/jsx/

[router]: https://github.com/rackt/react-router
[actions]: https://github.com/acdlite/redux-actions
[promise]: https://github.com/acdlite/redux-promise

[browserify]: http://browserify.org/
[babel]: https://babeljs.io/
[es6]: http://exploringjs.com/es6/
[katas]: http://es6katas.org/

[cssnext]: http://cssnext.io/
[cssmodules]: https://github.com/css-modules/css-modules

[madderncss]: http://glenmaddern.com/articles/css-modules
[vjeuxcss]: https://speakerdeck.com/vjeux/react-css-in-js
[longreact]: http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome
[henrikflux]: https://blog.andyet.com/2015/08/06/what-the-flux-lets-redux/
[longroute]: http://jlongster.com/A-Simple-Way-to-Route-with-Redux
[mjuniversal]: https://medium.com/@mjackson/universal-javascript-4761051b7ae9
[subrun]: http://substack.net/task_automation_with_npm_run
