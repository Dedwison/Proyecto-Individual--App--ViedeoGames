const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: [],
  filtros: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case "FILTER_BY_GENRES":
      const allVideogames = state.allVideogames;
      const genresFiltered =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((el) => el.genres.includes(action.payload));
      return {
        ...state,
        videogames: genresFiltered,
      };
    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "created"
          ? state.allVideogames.filter((el) => el.created)
          : state.allVideogames.filter((el) => !el.created);
      return {
        ...state,
        videogames:
          action.payload === "all" ? state.allVideogames : createdFilter,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedArr,
      };
    case "GET_VIDEOGAME_NAME":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_NAME_GENRES_FORM":
      return {
        ...state,
        genresForm: action.payload,
      };
    case "CLEAR_DETAIL":
      return {
        ...state,
        detail: [],
      };
    case "POST_VIDEOGAME":
      return {
        ...state,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
