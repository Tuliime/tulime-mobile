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
import { COLORS } from "@/constants";
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
import { replaceStringPart } from "@/utils/replaceStringPart";

const screenWidth = Dimensions.get("window").width * 0.98;
const formContainerWidth = screenWidth - 2 * 16;
const inputFieldWith = formContainerWidth - 64;

export const MessageForm: React.FC = () => {
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [fileList, setFileList] = useState<Asset["file"][]>([]);
  const auth = useAuthStore((state) => state.auth);
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
  const [mentionList, setMentionList] = useState<string[]>([]);
  const [showMentionList, setShowMentionList] = useState<boolean>(false);
  const [mentionValue, setMentionValue] = useState<string>("");
  const [textMessage, setTextMessage] = useState<string>("");
  const [textMessageInput, setTextMessageInput] = useState<string>("");
  const [transformedTextMessage, transformedSetTextMessage] =
    useState<string>("");

  const onPickImageHandler = (files: Asset["file"][]) => {
    setFileList(() => files);
  };

  const onLoadImageHandler = (isLoading: boolean) => {
    setIsLoadingFile(() => isLoading);
  };

  const onDeleteImageHandler = (inputIndex: number) => {
    setFileList(() => fileList.filter((_, index) => index !== inputIndex));
  };

  const addToMentionListHandler = (userID: string) => {
    const userIDExists: boolean = !!mentionList.find(
      (mentionID) => mentionID == userID
    );
    if (userIDExists) return;

    mentionList.push(userID);
  };

  const onMentionSelectHandler = (user: Auth["user"]) => {
    console.log("user mentioned: ", user);

    const replacingStringPartTransformed = `@tlmms${user.name}@tlmme`;
    const replacingStringPartInput = `@${user.name}`;
    const StringToBeReplaced = `@${mentionValue}`;

    const transformedTextMsg = replaceStringPart(
      textMessage,
      StringToBeReplaced,
      replacingStringPartTransformed
    );
    const inputTextMsg = replaceStringPart(
      textMessage,
      StringToBeReplaced,
      replacingStringPartInput
    );
    console.log("textMessage: ", textMessage);
    console.log("transformedTextMsg: ", transformedTextMsg);
    console.log("inputTextMsg: ", inputTextMsg);

    transformedSetTextMessage(() => transformedTextMsg);
    setTextMessageInput(() => transformedTextMsg);
    setShowMentionList(() => false);
    addToMentionListHandler(user.id);
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
    if (showSwipedMessage) values.reply = swipedMessage?.id!;

    formData.append("userID", values.userID);
    formData.append("text", values.text);
    formData.append("reply", values.reply);
    formData.append("sentAt", values.sentAt);
    formData.append("mention", JSON.stringify(values.mention));

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
    if (showSwipedMessage) values.reply = swipedMessage?.id!;
    values.localFile = { base64: file.base64, mimeType: file.mimeType };

    formData.append("userID", values.userID);
    // Attach text and it's reply to the first image file only
    if (fileIndex === 0) {
      formData.append("text", values.text);
      formData.append("reply", values.reply);
    } else {
      formData.append("text", "");
      formData.append("reply", "");
    }
    formData.append("sentAt", values.sentAt);
    formData.append("mention", JSON.stringify(values.mention));
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

  const makeFormValuesEmpty = () => {
    if (textInputRef.current) {
      textInputRef.current.clear();
    }
  };

  const formikSubmitHandler = (
    formik: FormikProps<TChatroom["messageInput"]>
  ) => {
    formik.handleSubmit();
    makeFormValuesEmpty();
  };

  const onChangeTextHandler = (
    formik: FormikProps<TChatroom["messageInput"]>,
    text: string
  ) => {
    formik.setFieldValue("text", text);
    setTextMessage(() => text);
    const mentionExtract = extractMention(text);

    if (!text || !mentionExtract.hasMention) {
      setShowMentionList(() => false);
    }
    if (mentionExtract.hasMention) {
      setShowMentionList(() => true);
      setMentionValue(() => mentionExtract.mention!);
    }
    console.log("text: ", text); //To be removed
    console.log("mention: ", mentionExtract); //To be removed
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
              value={formik.values["text"]}
              keyboardType={"default"}
            />
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
              {isPending ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={COLORS.white} />
                </View>
              ) : (
                <Ionicons name="send" size={20} color={COLORS.white} />
              )}
            </TouchableOpacity>
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
    height: 56,
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingRight: 8,
    gap: 4,
  },
  input: {
    // TODO: To input field height adjust with the number of words in
    flex: 1,
    width: inputFieldWith,
    borderWidth: 0,
    borderColor: COLORS.gray6,
    borderRadius: 4,
    color: COLORS.gray8,
    outline: "none",
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
