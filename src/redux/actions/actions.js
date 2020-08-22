import * as action_types from "./action_types";

export const fetch_user_details = (token) => (dispatch) => {
  fetch("http://localhost:1234/api/user/details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: action_types.fetch_user_data,
        payload: data
      });
    });
};

export const fetch_user_newsfeed = (token) => (dispatch) => {
  fetch("http://localhost:1234/api/user/newsfeed", {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      // Accept: "application/json",
      // "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  })
  .then((res) => res.json())
  .then(data=>{
    dispatch({
      type:action_types.fetch_user_newsfeed,
      payload:data
    })
  })
}
