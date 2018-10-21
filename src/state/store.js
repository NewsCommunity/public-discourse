import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

const persistConfig = {
  key: 'root',
  storage: localStorage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

function configureStore (/* deps = {} */) {
    /* eslint-disable-next-line no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    // add middlewares here
  const middleware = [thunkMiddleware]
    // use the logger in development mode - this is set in webpack.config.dev.js
  if (process.env.NODE_ENV !== 'production') {
        /* eslint-disable-next-line no-console */
    console.warn('----- In Development Mode -----')
        /* eslint-disable-next-line import/no-extraneous-dependencies, global-require */
    middleware.push(logger)
  }

  return createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleware)))
}

const store = configureStore()
const persistor = persistStore(store)
export { configureStore, store, persistor }
