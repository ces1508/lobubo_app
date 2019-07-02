import { createStore, compose, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

function configureStore (initialState) {
  const enhancer = compose(applyMiddleware(thunk, logger))
  return createStore(reducers, initialState, enhancer)
}

export default configureStore({})
