import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../context/authContext";
import "../global.css";

export default function RootLayout() {
    return (
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    )
}

const MainLayout = () => {
    const { isAuthenticated } = useAuth()
    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {
        // check if the user authenticated or not
        if (typeof isAuthenticated == 'undefined') return

        const inApp = segments[0] === '(app)'

        if (isAuthenticated && !inApp) {
            router.replace('(app)')

        } else if (!isAuthenticated) {
            router.replace('signin')

        }

    }, [isAuthenticated])

    return <Slot />
}