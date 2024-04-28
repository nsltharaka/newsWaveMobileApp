import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const handleRegister = async (username, email, password) => {

        try {
            const response = await axios.post(
                '/users/register',
                {
                    username,
                    email,
                    password
                }
            )

            const user = response.data

            const userString = JSON.stringify(user)
            SecureStore.setItem("currentUser", userString)
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.api_key}`


            setUser(user)


        } catch (error) {
            console.error(JSON.stringify(error.response.data, null, 2));
        }

    }


    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post(
                '/users/login',
                {
                    email,
                    password,
                }
            )

            const user = response.data
            const userString = JSON.stringify(user)
            SecureStore.setItem("currentUser", userString)
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.api_key}`

            setUser(user)

        } catch (error) {
            console.log(JSON.stringify(error.response.data, null, 2));
        }
    }

    const handleLogout = () => {
        SecureStore.deleteItemAsync("currentUser")
        setUser(null)
    }

    useEffect(() => {
        console.log("running useeffect on authContext...");

        const existingUserString = SecureStore.getItem("currentUser")
        if (existingUserString) {
            existingUser = JSON.parse(existingUserString)
            console.log("user exists: ", existingUser);
            axios.defaults.headers.common['Authorization'] = `Bearer ${existingUser.api_key}`
            setUser(existingUser)
            return
        }

        console.log("no persisted user");

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

