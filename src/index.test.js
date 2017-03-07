// @flow
import composeHocs from './'
describe('redux-compose-hocs', function () {
  it('enables composing', function () {
      function hocOne(reducer){
        return function hocOneReducer(state, action){
          if(action.type === 'hocOne'){
            return hocOneReducer(state, action.action)
          }
          return reducer(state, action)
        }
      }
      function hocTwo(reducer){
        return function hocTwoReducer(state, action){
          if(action.type === 'hocTwo'){
            return hocTwoReducer(state, action.action)
          }
          return reducer(state, action)
        }
      }
      const reducer = function (state, action){
        switch(action.type){
          case '1':
            return 1
          default:
            return 0
        }
      }
      const composedReducer = composeHocs(reducer, hocOne, hocTwo)
      
      const hocOneActionType = 'hocOne'
      const hocTwoActionType = 'hocTwo'
      const trueAction = {
        type: '1'
      }
      const falseAction = {
        type: '0'
      }
      function generateNestedAction(action){
        return {
          type: hocOneActionType,
          action: {
            type: hocTwoActionType,
            action: {
              type: hocOneActionType,
              action
            }
          }
        }
      }

      
      
      const nestedTrueAction = generateNestedAction(trueAction)
      const nestedFalseAction = generateNestedAction(falseAction)
      expect(composedReducer({}, nestedTrueAction)).toBe(1)
      expect(composedReducer({}, nestedFalseAction)).toBe(0)
  })
})