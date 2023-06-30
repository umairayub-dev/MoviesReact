import { createContext, useReducer, useEffect } from "react";

export const FavoritesContext = createContext()

const initialState = {
    favorites: []
}
export const FavoritesReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE_STATE':
            return { ...state, ...action.payload }
        case 'ADD_TO_FAVORITES':
            console.log(action.payload)
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case 'REMOVE_FROM_FAVORITES':
            return {
                ...state,
                favorites: state.favorites.filter((item) => item.id !== action.payload)
            }
        default:
            return state
    }
}

export const FavoritesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FavoritesReducer, initialState)

    const initializeStateFromLocalStorage = () => {
        const storedState = localStorage.getItem('favorites')
        const isDiff = storedState !== JSON.stringify(state)
        if (isDiff) {
            dispatch({ type: 'INITIALIZE_STATE', payload: JSON.parse(storedState) })
        }
    }
    useEffect(() => {
        initializeStateFromLocalStorage()
    }, [])
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(state))
    }, [state])

    return (
        <FavoritesContext.Provider value={{ state, dispatch }}>
            {children}
        </FavoritesContext.Provider>
    )
}  