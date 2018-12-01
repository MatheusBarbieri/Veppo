import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './user-redux/reducer'

const initialState = {
  authenticated: false
}

const middleware = [thunk]
export default createStore(
  userReducer,
  initialState,
  applyMiddleware(...middleware)
)
