redux-retype-actions
=====================

Rename action types

[![Build Status](https://travis-ci.org/l2silver/redux-retype-actions.svg?branch=master)](https://travis-ci.org/l2silver/redux-retype-actions)


## Why
If you use redux-batched-actions with any kind of redux dev tools, the batched actions show up simply as BATCH_ACTION, which doesn't tell you a whole lot about the action. Now you can easily rename a batch action to something more useful. Although this tool works with any kind of action, I can't think of any other use cases outside of batched-actions

```js
npm install --save redux-retype-actions
```

## Usage

```js
import {createStore} from 'redux';
import {batchActions, enableBatching} from 'redux-batched-actions';
import {retypeAction, enableRetyping} from 'redux-retype-actions';
import {createAction} from 'redux-actions';

const doThing = createAction('DO_THING')
const doOther = createAction('DO_OTHER')

function reducer(state, action) {
  switch (action.type) {
    case 'DO_THING': return 'thing'
    case 'DO_OTHER': return 'other'
    default: return state
  }
}

const store = createStore(enableRetyping(enableBatching(reducer)), initialState)
const doMultipleThings = retypeAction('DO_MULTIPLE_THINGS', batchActions([doThing(), doOther()]))
store.dispatch(doMultipleThings)
```