export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, token: action.payload, authStatus: "LoggedIn" };

    case "LOGOUT_USER":
      return { ...state, token: undefined, authStatus: undefined };

      case "UPDATE_USER":
        return {...state, token}
    default:
      return new Error("Unhandled action type:" + action.type);
  }
};
