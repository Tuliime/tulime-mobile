// export default {
module.exports = {
  expo: {
    name: "Tulime",
    slug: "tulime-app",
    description: "All in one for your agricultural needs",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icons/home/logo-temp.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash2.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.tulime.tulimeapp",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.tulime.tulimeapp",
      permissions: ["NOTIFICATIONS"],
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON || "./google-services.json",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router", "expo-document-picker", "expo-dev-client"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "fba553a4-abe5-4493-9ad0-dcd3566025dc",
      },
    },
    owner: "tulime",
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/fba553a4-abe5-4493-9ad0-dcd3566025dc",
    },
    notification: {
      icon: "./assets/icons/home/logo-temp.png",
      color: "#000000",
    },
  },
};
