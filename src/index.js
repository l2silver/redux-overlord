// @flow
type $action = {
  type: any
};

export default function(reducer: Function, overlordReducer: Function){
  return (state: any, action: $action)=>{
    return overlordReducer(reducer(state, action), action)
  }
}