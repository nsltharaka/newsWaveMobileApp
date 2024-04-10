import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(() => {
        setIsAuthenticated(false)
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user, setUser,
                isAuthenticated, setIsAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext)

    if (!value) {
        throw new Error('useAuth must be wrapped inside a AuthContextProvider')
    }

    return value
}