import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from "expo-router";
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
        'TiemposHeadlineBlack': require("../assets/fonts/TiemposHeadline-Black.otf"),
        'TiemposHeadlineBlackItalic': require("../assets/fonts/TiemposHeadline-BlackItalic.otf"),
        'TiemposHeadlineBold': require("../assets/fonts/TiemposHeadline-Bold.otf"),
        'TiemposHeadlineBoldItalic': require("../assets/fonts/TiemposHeadline-BoldItalic.otf"),
        'TiemposHeadlineLight': require("../assets/fonts/TiemposHeadline-Light.otf"),
        'TiemposHeadlineLightItalic': require("../assets/fonts/TiemposHeadline-LightItalic.otf"),
        'TiemposHeadlineMedium': require("../assets/fonts/TiemposHeadline-Medium.otf"),
        'TiemposHeadlineMediumItalic': require("../assets/fonts/TiemposHeadline-MediumItalic.otf"),
        'TiemposHeadlineRegular': require("../assets/fonts/TiemposHeadline-Regular.otf"),
        'TiemposHeadlineRegularItalic': require("../assets/fonts/TiemposHeadline-RegularItalic.otf"),
        'TiemposHeadlineSemibold': require("../assets/fonts/TiemposHeadline-Semibold.otf"),
        'TiemposHeadlineSemiboldItalic': require("../assets/fonts/TiemposHeadline-SemiboldItalic.otf"),
        'passionOneBlack': require("../assets/fonts/PassionOne-Black.ttf"),
        'passionOneBold': require("../assets/fonts/PassionOne-Bold.ttf"),
        'passionOneRegular': require("../assets/fonts/PassionOne-Regular.ttf"),
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
            router.replace('(tab)/topics')

        } else if (!user) {
            router.replace('signin')
        }

    }, [user])

    return (
        <Stack screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
        }}>
            <Stack.Screen name='(tab)' />
            <Stack.Screen name='index' />
            <Stack.Screen name='forgotPassword' />

            <Stack.Screen
                name='signin'
                options={{
                    animation: 'fade'
                }}
            />
            <Stack.Screen
                name='signUp'
                options={{
                    animation: 'fade'
                }}
            />
        </Stack>
    )
}