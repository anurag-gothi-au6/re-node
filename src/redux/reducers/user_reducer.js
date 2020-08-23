import * as action_type from "../actions/action_types";

const initialState = {
  userData: "",
};

export const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case action_type.fetch_user_data:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
