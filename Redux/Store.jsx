import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { composeWithDevTools } from "redux-devtools-extension";

import DataReducer from "./Reducer/DataReducer";

import StoreSaga from "./Saga/StoreSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  DataReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(StoreSaga);

export default store;
