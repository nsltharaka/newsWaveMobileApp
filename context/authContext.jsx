import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../lib/api";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'

export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const handleRegister = async (username, email, password) => {

        try {
            const response = await axios.post(
                `${API_URL}/users/register`,
                {
                    username,
                    email,
                    password
                }
            )

            const user = response.data

            const userString = JSON.stringify(user)
            await SecureStore.setItemAsync("currentUser", userString)

            setUser(user)


        } catch (error) {
            console.error(JSON.stringify(error.response.data, null, 2));
        }

    }


    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post(
                `${API_URL}/users/login`,
                {
                    email,
                    password,
                }
            )

            const user = response.data
            const userString = JSON.stringify(user)
            await SecureStore.setItemAsync("currentUser", userString)

            setUser(user)

        } catch (error) {
            console.log(error.response.data);
        }
    }

    const handleLogout = async () => {
        try {
            await SecureStore.deleteItemAsync("currentUser")
            setUser(null)
        } catch (error) {
            return
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const existingUser = await SecureStore.getItemAsync("currentUser")
                if (existingUser) {
                    setUser(JSON.parse(existingUser))
                }

            } catch (error) {
                return
            }
        })()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                handleRegister,
                handleLogin,
                handleLogout,
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

