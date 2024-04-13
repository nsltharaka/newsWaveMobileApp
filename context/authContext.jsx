import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    useEffect(() => { 
        setUser({
            username : "nisal",
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
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

