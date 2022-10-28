import { takeEvery } from "redux-saga/effects";
import { CALL_API } from "../../Action/DataAction";

import ProsesApi from "../Handler/ProsesApi";

function* GetApi() {
  yield takeEvery(CALL_API, ProsesApi);
}

export default GetApi;
