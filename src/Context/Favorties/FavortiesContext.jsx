import axios from "axios";
import { createContext, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/Auth/AuthContext";
import { useReducer } from "react";

const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

// Action types
const actionTypes = {
  FETCH_FAVORTIE_START: "FETCH_FAVORTIE_START",
  FETCH_FAVORTIE_SUCCESS: "FETCH_FAVORTIE_SUCCESS",
  FETCH_FAVORITE_ERROR: "FETCH_FAVORITE_ERROR",
  REMOVE_FAVORITES: "REMOVE_FAVORITES",
};

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FAVORTIE_START:
      return { ...state, loading: true };
    case actionTypes.FETCH_FAVORTIE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        favorites: action.payload,
      };
    case actionTypes.FETCH_FAVORITE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case actionTypes.REMOVE_FAVORITES:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);
  const authContext = useContext(AuthContext);

  const fetchFavorites = async () => {
    dispatch({ type: actionTypes.FETCH_FAVORTIE_START });
    try {
      await axios
        .get("https://victorious-lion-clothes.cyclic.cloud/api/favorites", {
          headers: {
            Authorization: `Bearer ${authContext.state?.token}`,
          },
        })
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_FAVORTIE_SUCCESS,
            payload: response.data,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (error) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    if (authContext.state?.authStatus === "LoggedIn") {
      fetchFavorites();
    }
  }, [authContext.state]);
  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext, FavoritesProvider };