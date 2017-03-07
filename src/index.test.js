// @flow
import {combineReducers} from 'redux'
import overlordReducer from './'
describe('redux-overlord-reducer', function () {
  it('enables sharing state', function () {
      
    function reducerOne(state, action){
      switch(action.type){
        default:
          return 'ONE'
      }
    }
  
    function reducerTwo(state, action){
      switch(action.type){
        default:
          return 'TWO'
      }
    }
      
    function parentReducer (state, action){
      switch(action.type){
        default:
          return {reducerTwo: state.reducerTwo, reducerOne: `${state.reducerOne} + ONE`}
      }
    }
    const composedReducer = overlordReducer(combineReducers({
      reducerOne,
      reducerTwo
    }), parentReducer)
          
    const firstAction = {type: 'INIT'}
    expect(composedReducer(undefined, firstAction)).toEqual({reducerOne: 'ONE + ONE', reducerTwo: 'TWO'})
  })
})