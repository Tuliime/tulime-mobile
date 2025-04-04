import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { COLORS, sounds } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { TChatroom } from "@/types/chatroom";
import { useAuthStore } from "@/store/auth";
import { useChatroomStore } from "@/store/chatroom";
import { chatroom } from "@/API/chatroom";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SwipedMessage } from "./SwipedMessage";
import uuid from "react-native-uuid";
// import { EmojiPicker } from "../shared/UI/EmojiPicker";
import { ImagePicker } from "../shared/UI/ImagePicker";
import { Asset } from "@/types/assets";
import { ImagePreview } from "../shared/UI/ImagePreview";
import { MentionList } from "./MentionList";
import { Auth } from "@/types/auth";
import { extractMention } from "@/utils/extractMention";
import { appendMention } from "@/utils/appendMention";
import {
  recoverTLMMSFromInvisible,
  transformTLMMSToInvisible,
} from "@/utils/tlmmsVisibility";
import { extractUsernameMentionList } from "@/utils/extractUsernameMentionList";
import { useKeypadInputTracker } from "@/hooks/useKeypadInputTracker";
import { Audio } from "expo-av";

const screenWidth = Dimensions.get("window").width * 0.98;
const formContainerWidth = screenWidth - 2 * 16;
const inputFieldWith = formContainerWidth - 64;

export const MessageForm: React.FC = () => {
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [fileList, setFileList] = useState<Asset["file"][]>([]);
  const auth = useAuthStore((state) => state.auth);
  const users = useAuthStore((state) => state.users);
  const addMessage = useChatroomStore((state) => state.addMessage);
  const addRepliedMessage = useChatroomStore((state) => state.addReply);
  const updateMessageBySentAt = useChatroomStore(
    (state) => state.updateMessageBySentAt
  );
  const updatePostingMessage = useChatroomStore(
    (state) => state.updatePostingMessage
  );
  const clearSwipedMessage = useChatroomStore(
    (state) => state.clearSwipedMessage
  );
  const swipedMessage = useChatroomStore((state) => state.swipedMessage);
  const showSwipedMessage: boolean = !!swipedMessage?.id;
  const showImagePreview: boolean = !!fileList[0]?.name;

  const textInputRef = useRef<TextInput>(null);
  const [showMentionList, setShowMentionList] = useState<boolean>(false);
  const [mentionValue, setMentionValue] = useState<string>("");
  const [text, setText] = useState<string>("");

  const { keypadInputTracker } = useKeypadInputTracker();

  const onPickImageHandler = (files: Asset["file"][]) => {
    setFileList(() => files);
  };

  const onLoadImageHandler = (isLoading: boolean) => {
    setIsLoadingFile(() => isLoading);
  };

  const onDeleteImageHandler = (inputIndex: number) => {
    setFileList(() => fileList.filter((_, index) => index !== inputIndex));
  };

  const onMentionSelectHandler = (user: Auth["user"]) => {
    console.log("user mentioned: ", user);

    const userMention = `@tlmms${user.name}@tlmme`;
    const textWithMention = appendMention(text, userMention);

    setText(() => transformTLMMSToInvisible(textWithMention));
    setShowMentionList(() => false);
  };

  const getMentionListHandler = (
    text: string,
    users: Auth["user"][]
  ): string[] => {
    const mentionList: string[] = [];
    const usernameMentionList = extractUsernameMentionList(text);

    usernameMentionList.map((usernameMention) => {
      const user = users.find((user) => user.name === usernameMention);
      if (!user?.id) return;
      mentionList.push(user!.id);
    });
    return mentionList;
  };

  const playSuccessPostSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      sounds.tapNotificationSound
    );
    await sound.setVolumeAsync(0.5);
    await sound.playAsync();
  };

  useEffect(() => {
    if (showSwipedMessage) {
      textInputRef.current?.focus();
    }
  }, [showSwipedMessage]);

  const initialFormValues: TChatroom["messageInput"] = {
    userID: auth.user.id,
    text: "",
    reply: "",
    file: null,
    localFile: { base64: "", mimeType: "" },
    sentAt: "",
    mention: [""],
    values: {
      //To be investigated and removed
      base64: "",
    },
  };

  const messageValidationSchema = yup.object().shape({
    text: yup.string().required("message is required"),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: chatroom.post,
    onSuccess: (response: any) => {
      console.log("chatroom response:", response);
      updateMessageBySentAt(response.data);
      updatePostingMessage({ status: "success", sentAt: response.data.sentAt });
      setText(() => "");
      playSuccessPostSound();
    },
    onError: (error) => {
      console.log("Error:", error);
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: error.message,
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
      });
    },
  });

  const genInitialMessageValues = (
    values: TChatroom["messageInput"]
  ): TChatroom["message"] => {
    const message: TChatroom["message"] = {
      id: uuid.v4(),
      userID: auth.user.id,
      text: values.text,
      reply: values.text,
      mention: values.mention as any,
      sentAt: values.sentAt,
      arrivedAt: values.sentAt,
      createdAt: values.sentAt,
      updatedAt: values.sentAt,
      deletedAt: null,
    };
    return message;
  };

  const messageWithoutFileSubmitHandler = (
    values: TChatroom["messageInput"]
  ) => {
    const formData = new FormData();
    values.sentAt = new Date().toISOString();
    const reply = !!swipedMessage?.id! ? swipedMessage?.id! : "";
    const mentionList = getMentionListHandler(text, users);

    formData.append("userID", values.userID);
    formData.append("text", text);
    formData.append("reply", reply);
    formData.append("sentAt", values.sentAt);
    formData.append("mention", JSON.stringify(mentionList));

    if (values.file) {
      formData.append("file", new Blob([values.file]));
    }

    addMessage(genInitialMessageValues(values));
    addRepliedMessage(swipedMessage!);
    updatePostingMessage({ status: "pending", sentAt: values.sentAt });
    mutate({ formData: formData, token: auth.accessToken });
    clearSwipedMessage();
  };

  const messageWithFileSubmitHandler = (
    values: TChatroom["messageInput"],
    file: Asset["file"],
    fileIndex: number
  ) => {
    const formData = new FormData();
    values.sentAt = new Date().toISOString();
    const reply = !!swipedMessage?.id! ? swipedMessage?.id! : "";
    values.localFile = { base64: file.base64, mimeType: file.mimeType };
    const mentionList = getMentionListHandler(text, users);

    formData.append("userID", values.userID);
    // Attach text and it's reply to the first image file only
    if (fileIndex === 0) {
      formData.append("text", text);
      formData.append("reply", reply);
    } else {
      formData.append("text", "");
      formData.append("reply", "");
    }
    formData.append("sentAt", values.sentAt);
    formData.append("mention", JSON.stringify(mentionList));
    formData.append("file", {
      uri: file.uri,
      name: "media",
      type: file.mimeType,
    } as any);

    addMessage(genInitialMessageValues(values));
    addRepliedMessage(swipedMessage!);
    updatePostingMessage({ status: "pending", sentAt: values.sentAt });
    mutate({ formData: formData, token: auth.accessToken });
    clearSwipedMessage();
  };

  const messageSubmitHandler = (values: TChatroom["messageInput"]) => {
    if (fileList.length === 0) {
      messageWithoutFileSubmitHandler(values);
      return;
    }
    for (let index = 0; index < fileList.length; index++) {
      messageWithFileSubmitHandler(values, fileList[index], index);
    }
    setFileList(() => []);
  };

  const makeFormValuesEmpty = (
    formik: FormikProps<TChatroom["messageInput"]>
  ) => {
    if (textInputRef.current) {
      textInputRef.current.clear();
      // formik.setFieldValue("text", "");
    }
  };

  const formikSubmitHandler = (
    formik: FormikProps<TChatroom["messageInput"]>
  ) => {
    formik.handleSubmit();
    makeFormValuesEmpty(formik);
  };

  const onChangeTextHandler = (
    formik: FormikProps<TChatroom["messageInput"]>,
    text: string
  ) => {
    formik.setFieldValue("text", transformTLMMSToInvisible(text));
    setText(() => transformTLMMSToInvisible(text));

    const originalText = recoverTLMMSFromInvisible(text);
    const mentionExtract = extractMention(originalText);

    if (!text || !mentionExtract.hasMention) {
      setShowMentionList(() => false);
    }
    if (mentionExtract.hasMention) {
      setShowMentionList(() => true);
      setMentionValue(() => mentionExtract.mention!);
    }
    keypadInputTracker(text, "chatroom", "*");
  };

  const disableSubmitButton = (
    formik: FormikProps<TChatroom["messageInput"]>
  ): boolean => {
    const hasErrors = !!formik.errors["text"];

    if (hasErrors) return hasErrors;
    return isPending;
  };

  return (
    <View style={styles.container}>
      {/* <EmojiPicker /> */}
      {showSwipedMessage && <SwipedMessage />}
      {isLoadingFile && (
        <View style={styles.fileLoaderContainer}>
          <ActivityIndicator size="small" color={COLORS.gray7} />
          <Text style={styles.fileLoaderText}>
            Please wait, files loading..
          </Text>
        </View>
      )}
      {showImagePreview && (
        <ImagePreview files={fileList} onDelete={onDeleteImageHandler} />
      )}
      {showMentionList && (
        <MentionList
          onSelect={onMentionSelectHandler}
          mentionValue={mentionValue}
        />
      )}
      <Formik
        validationSchema={messageValidationSchema}
        initialValues={initialFormValues}
        onSubmit={(values) => messageSubmitHandler(values)}
      >
        {(formik) => (
          <View style={[styles.formContainer, {}]}>
            <TextInput
              ref={textInputRef}
              placeholder={"Please be polite"}
              style={styles.input}
              onChangeText={(text) => {
                onChangeTextHandler(formik, text);
              }}
              onBlur={formik.handleBlur("text")}
              // value={formik.values["text"]}
              value={text}
              keyboardType={"default"}
              multiline
            />
            <View style={styles.formActionsContainer}>
              <ImagePicker
                onPick={onPickImageHandler}
                onLoading={onLoadImageHandler}
              />
              <TouchableOpacity
                style={[
                  styles.button,
                  { opacity: disableSubmitButton(formik) ? 0.75 : 1 },
                ]}
                onPress={(_) => {
                  formikSubmitHandler(formik);
                }}
                disabled={disableSubmitButton(formik)}
              >
                <Ionicons name="send" size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderTopWidth: 1,
    borderColor: COLORS.gray5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  fileLoaderContainer: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    gap: 8,
  },
  fileLoaderText: {
    color: COLORS.gray7,
    fontSize: 12,
  },
  formContainer: {
    backgroundColor: COLORS.gray4,
    minHeight: 56,
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingRight: 8,
    paddingVertical: 8,
    gap: 4,
  },
  input: {
    minHeight: 44,
    maxHeight: 112,
    flex: 1,
    width: inputFieldWith,
    borderWidth: 0,
    borderColor: COLORS.gray6,
    borderRadius: 4,
    color: COLORS.gray8,
    outline: "none",
    padding: 0,
  },
  formActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    width: 44,
    height: 44,
    borderRadius: 1000,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
