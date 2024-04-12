import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../context/authContext";
import "../global.css";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from 'expo-router';

// export const unstable_settings = {
//     // Ensure that reloading on `/modal` keeps a back button present.
//     initialRouteName: '(tabs)',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const [loaded, error] = useFonts({
        InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
        passionOneBlack: require('../assets/fonts/PassionOne-Black.ttf'),
        passionOneBold: require('../assets/fonts/PassionOne-Bold.ttf'),
        passionOneRegular: require('../assets/fonts/PassionOne-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    )
}

const MainLayout = () => {
    const { user } = useAuth()
    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {

        const inApp = segments[0] === '(app)'

        if (user && !inApp) {
            router.replace('(app)')

        } else if (!user) {
            router.replace('signin')
        }

    }, [user])

    return <Slot />
}