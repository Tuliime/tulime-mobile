const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.tulime.tulimeapp.dev";
  }
  if (IS_PREVIEW) {
    return "com.tulime.tulimeapp.preview";
  }
  return "com.tulime.tulimeapp";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Tulime (Dev)";
  }
  if (IS_PREVIEW) {
    return "Tulime (Preview)";
  }
  return "Tulime";
};

module.exports = {
  expo: {
    name: getAppName(),
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
      bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: getUniqueIdentifier(),
      permissions: ["NOTIFICATIONS"],
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
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
