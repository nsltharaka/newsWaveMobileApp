import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext()
export const GlobalContextProvider = ({ children }) => {

    const [selectedTopic, setSelectedTopic] = useState({})

    return (
        <GlobalContext.Provider
            value={{
                selectedTopic, setSelectedTopic
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

