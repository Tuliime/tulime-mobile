import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import "react-native-reanimated";
import { Providers } from "@/provider";
import Toast from "react-native-toast-message";
import { UseGlobalHooks } from "@/hooks/useGlobalHooks";
import { UseGlobalRequestInterceptor } from "@/hooks/useGlobalNetworkInterceptor";

import { useColorScheme } from "@/hooks/useColorScheme";

// import * as Sentry from "@sentry/react-native";

// const environment = process.env.EXPO_PUBLIC_ENV;

// if (environment === "preview" || environment === "production") {
//   Sentry.init({
//     dsn: process.env.SENTRY_DSN,
//     debug: true,
//   });
// }

// Sentry.init({
//   dsn: "https://ad71a8376d300daaa9d0e86008977954@o4508982538338304.ingest.de.sentry.io/4508982544957520",
//   sendDefaultPii: true,
// });

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // function RootLayout() {
  // const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // return (
  //   <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
  //     <Stack>
  //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //       <Stack.Screen name="+not-found" />
  //     </Stack>
  //   </ThemeProvider>
  // );

  if (!fontsLoaded) return null;

  // return <Stack onLayout={onLayoutRootView} />;

  // TODO: global providers here
  // TODO: To put an auto logout here

  console.log("Invoked at global _layout");
  return (
    <Providers>
      <Stack />
      <Toast />
      <UseGlobalHooks />
      <UseGlobalRequestInterceptor />
    </Providers>
  );
}

// export default Sentry.wrap(RootLayout);
