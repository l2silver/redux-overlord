redux-overlord
=====================

Give an overlord reducer access to the entire combineReducer state

[![Build Status](https://travis-ci.org/l2silver/redux-overlord.svg?branch=master)](https://travis-ci.org/l2silver/redux-overlord)


## Why
Although sharing the state of reducers is generally considered an anti pattern, there are cases where it's neeccessary. For myself, I wanted the ability to batch complex actions together, and one of those actions was a generic reordering action. I separate my relationship reducers from their respective entities to take advantage of handling a single action with multiple reducers, but the problem with the reordering action is that it relies on information in the entities themselves. Now under normal circumstances, I would get the state, get all the information I need, and then send the reorder action with the correct order already calculated. Since I'm batching actions, however, and my reorder action depends on the preceding actions, I need the ability to calculate and change the reordered relationship directly inside an overlord reducer.

```
npm install --save redux-overlord
```

## Usage

```
import {createStore, combineReducers} from 'redux';
import shadowReducer from 'redux-overlord';

function one(state, action){
	switch(action.type){
		default:
			return 1
	}
}

function two(state, action){
	switch(action.type){
		default:
			return 2
	}
}

const overlordReducer = function(state, action){
	switch(action.type)
		default:
			return {one: state.one, two: state.two + 1}
}

const shadowedReducer = shadowReducer(
	combineReducers({one, two}),
	overlordReducer
)



const store = createStore(shadowedReducer, initialState)
```