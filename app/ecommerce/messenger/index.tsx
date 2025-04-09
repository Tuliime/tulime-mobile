import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from "react-native";
import { PrimaryLayout } from "@/components/shared/layout/PrimaryLayout";
import { useQuery } from "@tanstack/react-query";
import { messenger } from "@/API/messenger";
import { useAuthStore } from "@/store/auth";
import { TMessenger } from "@/types/messenger";
import { isArrayWithElements } from "@/utils/isArrayWithElements";
import { COLORS } from "@/constants";
import { ErrorCard } from "@/components/shared/UI/ErrorCard";
import { MessengerRoomCard } from "@/components/ecommerce/messenger/UI/MessengerRoomCard";

const screenWidth = Dimensions.get("window").width * 0.999;

const MessengerRoomList: React.FC = () => {
  const userID = useAuthStore((state) => state.auth.user.id);

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`messenger-${userID}`],
    queryFn: () => {
      return messenger.getRoomsByUser({
        userID: userID,
        limit: 20,
        cursor: "",
      });
    },
  });

  const messengerRooms: TMessenger["message"][] = data?.data ?? [];
  const hasRooms = isArrayWithElements(messengerRooms);

  console.log("messengerRooms: ", messengerRooms);

  const renderMessengerRoomItem = useCallback(
    ({ item }: { item: TMessenger["message"] }) => {
      return (
        <View style={{ width: "100%", margin: 2 }}>
          <MessengerRoomCard message={item} />
        </View>
      );
    },
    []
  );

  if (isPending) {
    return (
      <PrimaryLayout>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue7} />
        </View>
      </PrimaryLayout>
    );
  }

  if (isError) {
    return (
      <PrimaryLayout>
        <View style={styles.errorContainer}>
          <ErrorCard message={error.message} />
        </View>
      </PrimaryLayout>
    );
  }

  return (
    <PrimaryLayout>
      <View>
        <Text>Chatroom card here</Text>
      </View>
      {hasRooms && (
        <FlatList
          data={messengerRooms!}
          keyExtractor={(item) => item.id}
          renderItem={renderMessengerRoomItem}
          scrollEnabled={false}
          numColumns={1}
          contentContainerStyle={{
            justifyContent: "center",
            backgroundColor: "",
          }}
        />
      )}
    </PrimaryLayout>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessengerRoomList;
