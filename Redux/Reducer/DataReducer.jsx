import { GET_API } from "../Action/DataAction";

const res = {
  data: [],
};

const DataReducer = (state = res, action) => {
  switch (action.type) {
    case GET_API:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default DataReducer;
