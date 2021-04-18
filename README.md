# redux-actions-log

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mattlean/redux-actions-log/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/redux-actions-log.svg?colorB=brightgreen)](https://npmjs.com/package/redux-actions-log) [![Run Tests](https://github.com/mattlean/redux-actions-log/workflows/Run%20Tests/badge.svg)](https://github.com/mattlean/redux-actions-log/actions)

**Redux Actions Log** is a simple [Redux middleware](https://redux.js.org/tutorials/fundamentals/part-4-store#middleware) that logs actions dispatched the store.

## Install

`npm install --save redux-actions-log`

`yarn add redux-actions-log`

## Usage

Getting action logging setup is simple.

```javascript
import { createStore, applyMiddleware } from 'redux';
import setupReduxActionsLog from 'redux-actions-log';
import rootReducer from './reducers';

const [actionsLogMiddleware, actionsLog] = setupReduxActionsLog();
const store = createStore(rootReducer, applyMiddleware(actionsLogMiddleware));

store.dispatch({
  type: 'FOOBAR_ACTION_TYPE',
  payload: 'baz'
});

console.log(actionsLog.getActions());
// logs "[ { type: 'FOOBAR_ACTION_TYPE', payload: 'baz' } ]"
```

`setupReduxActionsLog` will return the middleware you apply to the Redux store along with the log that will keep track of the dispatched actions.

Once the middleware is applied, all you need to do is call `actionsLog.getActions` to retrieve an array of all the logged actions.

By default, the actions log will only log standard Redux actions. If you want to log other functionality that affects actions like [Redux Thunk](https://npmjs.com/package/redux-thunk), you must enable the `logAll` option. There are two ways to do this:

**Method 1: Enable `logAll` option in `setupReduxActionsLog` parameter.**

```javascript
const [actionsLogMiddleware, actionsLog] = setupReduxActionsLog(true);
```

**Method 2: Set `logAll` option with `actionsLog.setLogAll`.**

```javascript
const [actionsLogMiddleware, actionsLog] = setupReduxActionsLog();
actionsLog.setLogAll(true);
```

Note that this package supports [TypeScript](https://www.typescriptlang.org) and declaration files are included.

## Why Do I Need This?

Before you use this, make sure there aren't better ways to accomplish what you want first!

If you simply need to debug actions, [Redux DevTools](https://redux.js.org/tutorials/fundamentals/part-4-store#redux-devtools) will most likely do what you need.

If you need to test simple asynchronous action creators, check out [`redux-mock-store`](https://npmjs.com/package/redux-mock-store) first as it will probably be able to get the job you need done. (In fact this package is what inspired the creation Redux Actions Log.)

Now if the above options don't work for you, then this middleware is hopefully what you need! The most common cases where Redux Actions Log can be useful are usually around scenarios when your application or tests need direct access to a log of Redux actions and you need to work with a real Redux store.

## API
```javascript
setupReduxActionsLog(logAll?: boolean) => [middleware, actionsLog]
```
The default export of the package will return a function that returns two things:

1. The middleware which you will get working with your Redux store using [`applyMiddleware()`](https://redux.js.org/api/applymiddleware).
2. The log that keeps track of the Redux actions dispatched to the store that's applied with this middleware.

```javascript
actionsLog.getActions() => actions: Array
```
Returns the actions of the store.

```javascript
actionsLog.clearActions()
```
Clears the stored actions.

```javascript
actionsLog.setLogAll(logAll: boolean)
```
Turn log all option on or off.

```javascript
actionsLog.getLogAll() => logAll: boolean
```
Get current log all setting.

## License

This project is [MIT licensed](https://github.com/mattlean/redux-actions-log/blob/main/LICENSE).
