import { COLORS, icons } from "@/constants";
import { useAuthStore } from "@/store/auth";
import { Auth } from "@/types/auth";
import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { ProfileAvatar } from "../shared/UI/ProfileAvatar";

type MentionListProps = {
  onSelect: (user: Auth["user"]) => void;
  mentionValue: string;
};

export const MentionList: React.FC<MentionListProps> = (props) => {
  const currentUser = useAuthStore((state) => state.auth.user);
  const users = useAuthStore((state) => state.users);
  const hasMentionValue: boolean = !!props.mentionValue;

  const filteredUsers = users.filter((user) => {
    if (!hasMentionValue) return user.id !== currentUser.id;

    return (
      user.id !== currentUser.id &&
      user.name.toLowerCase().includes(props.mentionValue.toLowerCase())
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
