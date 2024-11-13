import { ReactNode } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, SIZES } from "@/constants";

type MainLayoutProps = {
  children: ReactNode;
  headerLeft: ReactNode;
  headerRight: ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* TODO: put sidebar here */}
      <Stack.Screen
        options={{
          headerStyle: {
            // backgroundColor: COLORS.lightWhite,
            backgroundColor: "#f8f9fa", //green-9
          },
          headerShadowVisible: false,
          headerLeft: () => <View>{props.headerLeft}</View>,
          headerRight: () => <View>{props.headerRight}</View>,
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>{props.children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};
