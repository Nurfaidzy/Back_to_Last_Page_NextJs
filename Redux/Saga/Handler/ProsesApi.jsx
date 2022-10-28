import axios from "axios";
import { put } from "redux-saga/effects";
import { GET_API } from "../../Action/DataAction";

function* ProsesApi() {
  try {
    const res = yield axios.get("https://jsonplaceholder.typicode.com/posts");
    const data = res.data;
    yield put({ type: GET_API, payload: data });
  } catch (error) {
    console.log(error);
  }
}
export default ProsesApi;
