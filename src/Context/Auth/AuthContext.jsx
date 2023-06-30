import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from './AuthReducer'

export const AuthContext = createContext()

const initialState = {
    users: [],
    authStatus: undefined,
    currentUser: undefined
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const initializeStateFromLocalStorage = () => {
        const storedState = localStorage.getItem('authState')
        const isDiff = storedState !== JSON.stringify(state)
        if (isDiff) {
            dispatch({ type: 'INITIALIZE_STATE', payload: JSON.parse(storedState) })
        }
    }
    useEffect(() => {
        initializeStateFromLocalStorage()
    }, [])
    useEffect(() => {
        localStorage.setItem('authState', JSON.stringify(state))
    }, [state])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}  