const userExists = (users, user) => {
    return users.filter(usr => usr.email === user.email).length > 0 ? true : false
}
export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE_STATE':
            return { ...state, ...action.payload }
        case 'SIGNUP_USER':
            if (userExists(state.users, action.payload)) {
                return { ...state, authStatus: "emailAlreadyExists", }
            } else return {
                ...state,
                authStatus: "SignedUp",
                users: [...state.users, action.payload]
            }


        case 'LOGIN_USER':
            if (userExists(state.users, action.payload)) {
                return { ...state, authStatus: "LoggedIn", currentUser: action.payload }
            } else return {
                ...state,
                authStatus: "NoSuchUser"
            }

        case 'LOGOUT_USER':
            return {
                ...state,
                authStatus: undefined,
                currentUser: undefined
            }
        case 'RESET_AUTH_STATUS':
            return {
                ...state,
                authStatus: undefined,
            }
        default:
            return new Error('Unhandled action type:' + action.type)
    }
}
