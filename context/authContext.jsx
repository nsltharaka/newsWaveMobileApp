import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession()

export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '570264919858-4o9e1ac07t2tv1cjk4pi53rugpi923dr.apps.googleusercontent.com',
        iosClientId: '570264919858-e4un206nf61obq94s5v8hvge8118fjod.apps.googleusercontent.com'
    })

    useEffect(() => {
        console.log("auth effect running...");
        async function handleSignInWithGoogle() {
            // check if the user already logged in
            const user = AsyncStorage.getItem('@user')
            if (!user) {
                if (response?.type == 'success') {
                    try {
                        await getUserInfo(response.authentication.accessToken)
                    } catch (error) {
                        console.log(error);
                        return
                    }
                }
            } else {
                setUser(JSON.parse(user))
            }
        }

        const getUserInfo = async (token) => {
            if (!token) return
            
            try {
                const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })

                const user = await response.JSON()
                await AsyncStorage.setItem("@user", JSON.stringify(user))
                setUser(user)

            } catch (error) {
                console.log(error);
                return
            }

        }

        handleSignInWithGoogle()
    }, [response])



    return (
        <AuthContext.Provider
            value={{
                user,
                promptAsync,
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

