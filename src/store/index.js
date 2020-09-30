import {createStore, combineReducers} from 'redux'

const reducer = combineReducers({criteria, products})
const store = createStore(reducer)

export default store
