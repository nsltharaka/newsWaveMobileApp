import axios, { HttpStatusCode } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert, BackHandler } from "react-native";

export const GlobalContext = createContext()
export const GlobalContextProvider = ({ children }) => {

    const [selectedTopic, setSelectedTopic] = useState({})
    const [extractedFeeds, setExtractedFeeds] = useState([])

    useEffect(() => {
        // server check
        axios.get("/health", { timeout: 5000 })
            .then(resp => {
                if (resp.status !== HttpStatusCode.Ok) {
                    Alert.alert('Could not connect to server', 'Please try again later', [
                        { text: 'OK', onPress: () => BackHandler.exitApp() },
                    ]);
                }
                console.log("server health check passed");
            })

    }, [])

    return (
        <GlobalContext.Provider
            value={{
                selectedTopic, setSelectedTopic,
                extractedFeeds, setExtractedFeeds
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    const value = useContext(GlobalContext)

    if (!value) {
        throw new Error('GlobalContext must be wrapped inside a AuthContextProvider')
    }

    return value
}

