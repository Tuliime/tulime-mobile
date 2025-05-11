import { ProfileAvatar } from "@/components/shared/UI/ProfileAvatar";
import { COLORS } from "@/constants";
import { useAuthStore } from "@/store/auth";
import { Auth } from "@/types/auth";
import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type TagListProps = {
  onSelect: (user: Auth["user"]) => void;
  tagValue: string;
};

export const TagList: React.FC<TagListProps> = (props) => {
  const currentUser = useAuthStore((state) => state.auth.user);
  const users = useAuthStore((state) => state.users);
  const hasTagValue: boolean = !!props.tagValue;

  // TODO: To make api call to fetch the recipients products

  const filteredUsers = users.filter((user) => {
    if (!hasTagValue) return user.id !== currentUser.id;

    return (
      user.id !== currentUser.id &&
      user.name.toLowerCase().includes(props.tagValue.toLowerCase())
    );
  });

  const onSelectHandler = (user: Auth["user"]) => props.onSelect(user);

  const renderUserItem = useCallback(({ item }: { item: Auth["user"] }) => {
    return (
      <TouchableOpacity
        style={styles.userContainer}
        onPress={(_) => onSelectHandler(item)}
      >
        <ProfileAvatar user={item} width={32} height={32} fontWeight={500} />
        <Text style={styles.usernameText}>{item.name}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id!}
        renderItem={renderUserItem}
        numColumns={1}
        contentContainerStyle={{ rowGap: 2, flexGrow: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS.gray3,
    borderRadius: 4,
    maxHeight: 200,
    paddingVertical: 4,
  },
  userContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray5,
    padding: 4,
  },
  usernameText: {
    color: COLORS.gray7,
    fontWeight: 500,
  },
});
