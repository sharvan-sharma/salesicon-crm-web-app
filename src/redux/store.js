import rootReducer from './root.reducer'
//import {createStore} from 'redux'

//const store = createStore(rootReducer)
import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'

const middlewares = [logger]

const store = createStore(rootReducer,applyMiddleware(...middlewares))


export default store