// @flow
type $action = {
  type: any
};

export default function(reducer: Function, ...hocs: Function[]){
  const hocsLength = hocs.length
  return function tryAllHocs(state: any, action: $action){
    let counter = 0
    function stateActionChange(nextState, nextAction){
      if (counter === hocsLength) {
        return reducer(nextState, nextAction)
      }
      if(nextState === state && nextAction === action){
        counter += 1
        return
      }
      return tryAllHocs(nextState, nextAction)
    }
    return hocs.concat([(rawReducer)=>rawReducer]).reduce((finalState, hoc) => {
      const result = hoc(stateActionChange)(state, action)
      return result !== undefined ? result : finalState
    }, state)
  }
}
