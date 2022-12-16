import axios from "axios";

export function getVideogames(order) {
  return async function (dispatch) {
    var response = await axios.get("/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: response.data,
    });
  };
}
export function filterVideogamesByGenres(payload) {
  return {
    type: "FILTER_BY_GENRES",
    payload,
  };
}
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function getVideogamesNames(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/videogames?name=${payload}`);
      return dispatch({
        type: "GET_VIDEOGAME_NAME",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getGenres() {
  return async function (dispatch) {
    let response = await axios.get("/genres");
    return dispatch({ type: "GET_GENRES", payload: response.data });
  };
}
export function clearDetail() {
  return function (dispatch) {
    return dispatch({ type: "CLEAR_DETAIL" });
  };
}
export function postVideogame(payload) {
  return async function (dispatch) {
    const response = await axios.post("/videogames", payload);
    return response;
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/videogames/${id}`);
      return dispatch({
        type: "GET_DETAIL",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
