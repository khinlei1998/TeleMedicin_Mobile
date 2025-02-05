import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import appReducer from './reducer';

 const enhancers = [
   applyMiddleware(
     thunkMiddleware,
     createLogger({
       collapsed: true,
        // eslint-disable-next-line no-undef
       predicate: () => __DEV__,
     }),
   ),
 ];
/* eslint-disable no-undef */
 const composeEnhancers =
   (__DEV__ &&
     typeof window !== 'undefined' &&
     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
   compose;
 /* eslint-enable no-undef */

  const enhancer = composeEnhancers(...enhancers);




 const persistConfig = {
   key: 'root',
   storage,
   blacklist: [],
 };

 const persistedReducer = persistReducer(persistConfig, appReducer);
 export const store = createStore(persistedReducer, {}, enhancer);
 export const persistor = persistStore(store);


// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   appReducer /* preloadedState, */,
//   composeEnhancer(applyMiddleware(thunk)),
// )

export default store;
