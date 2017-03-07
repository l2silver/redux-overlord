// @flow
import {enableRetyping, retypeAction} from './'

describe('redux-retype-actions', function () {
  it('enables action retyping', function () {
      const reducer = function (state, action){
        switch(action.type){
          case '1':
            return 1
          default:
            return 0
        }
      }
      const enabledReducer = enableRetyping(reducer)
      const trueAction = {
        type: '1',
      }
      const falseAction = {
        type: '0'
      }
      const renameTrueAction = retypeAction('TRUE', trueAction)
      const renameFalseAction = retypeAction('FALSE', falseAction)
      expect(enabledReducer({}, renameTrueAction)).toBe(1)
      expect(enabledReducer({}, renameFalseAction)).toBe(0)
      expect(renameTrueAction.type).toBe('TRUE')
      expect(renameFalseAction.type).toBe('FALSE')
  })
})