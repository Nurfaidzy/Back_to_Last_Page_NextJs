import { all } from "redux-saga/effects";
import GetApi from "./Watcher/GetApi";

function* StoreSaga() {
  yield all([GetApi()]);
}

export default StoreSaga;
