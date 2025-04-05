import React, { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNotificationStore } from "@/store/notification";
import { NotificationCard } from "@/components/notification/UI/NotificationCard";
import { TNotification } from "@/types/notification";
import { MainLayout } from "@/components/shared/layout";

const Notification = () => {
  const notifications = useNotificationStore((state) => state.notifications);

  const renderUserItem = useCallback(
    ({ item }: { item: TNotification["notification"] }) => {
      return <NotificationCard notification={item} />;
    },
    []
  );

  return (
    <MainLayout title="Notifications">
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id!}
        renderItem={renderUserItem}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
      />
    </MainLayout>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  listContainer: {
    rowGap: 12,
    flexGrow: 1,
  },
});
