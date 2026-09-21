import {createStore} from './core.js'
import reducer from './reducer.js'

const {attach, connect, dispatch, getState} = createStore(reducer);

window.dispatch = dispatch
window.getState = getState

export {
  attach,
  connect
}