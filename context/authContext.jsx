import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from "react";
import { Alert, ToastAndroid } from "react-native";

export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const handleRegister = async (username, email, password) => {

        try {
            const { data: userData } = await axios.post(
                '/users/register',
                {
                    username,
                    email,
                    password
                },
                {
                    timeout: 5000
                }
            )

            const userString = JSON.stringify(userData)
            SecureStore.setItem("currentUser", userString)
            axios.defaults.headers.common['Authorization'] = `Bearer ${userData.api_key}`

            setUser(userData)
            ToastAndroid.show("Registration Successful", ToastAndroid.SHORT)

        } catch ({ response, request }) {
            if (response) {
                Alert.alert('Registration Failed', response.data.error)
            } else if (request) {
                Alert.alert('Connection Failed', 'please check your internet connection and try again.')
            } else {
                console.log('Error', error.message);
            }
        }
    }


    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post(
                '/users/login',
                {
                    email,
                    password,
                },
                {
                    timeout: 5000
                }
            )

            const user = response.data
            const userString = JSON.stringify(user)
            SecureStore.setItem("currentUser", userString)
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.api_key}`

            setUser(user)

        } catch ({ response, request }) {
            if (response) {
                Alert.alert('Login Failed', 'please check your username or password and try again.')
            } else if (request) {
                Alert.alert('Connection Failed', 'please check your internet connection and try again.')
            } else {
                console.log('Error', error.message);
            }
        }
    }

    const handleLogout = () => {
        Alert.alert("You are about to logout", "continue?", [
            {
                text: "Yes",
                onPress: () => {
                    SecureStore.deleteItemAsync("currentUser")
                    setUser(null)
                },
            },
            {
                text: "No",
                isPreferred : true,
                style: 'cancel'
            },
        ])
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

        console.log("no existing user");

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

