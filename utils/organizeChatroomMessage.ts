import { AppDate } from "./appDate";
import { Auth } from "../types/auth";
import { TChatroom } from "@/types/chatroom";

export class ChatroomMessages {
  messages: TChatroom["message"][];
  replies: TChatroom["message"][];
  users: Auth["user"][];
  currentUser: Auth["user"];

  constructor(
    messages: TChatroom["message"][],
    replies: TChatroom["message"][],
    users: Auth["user"][],
    currentUser: Auth["user"]
  ) {
    this.messages = messages;
    this.replies = replies;
    this.users = users;
    this.currentUser = currentUser;
  }

  isCurrentUserSender(message: TChatroom["message"]): boolean {
    if (this.currentUser.id === message.userID) return true;
    return false;
  }

  isPrimaryMessage(
    prevMessage: TChatroom["message"],
    currentMessage: TChatroom["message"]
  ): boolean {
    const currentSenderId = currentMessage.userID;
    const prevSenderId = prevMessage && prevMessage.userID;
    const currentDate = currentMessage.arrivedAt;
    const prevDate = prevMessage && prevMessage.arrivedAt;

    const isDifferentSender = currentSenderId !== prevSenderId;
    const hasDifferentDay = this.hasDifferentDay(prevDate, currentDate);

    if (isDifferentSender || hasDifferentDay) {
      return true;
    }
    return false;
  }

  hasDifferentDay(prevDate: string, currentDate: string): boolean {
    const prevDay = prevDate && new AppDate(prevDate).day();
    const currentDay = new AppDate(currentDate).day();

    if (currentDay !== prevDay) return true;
    if (currentDay === prevDay) return false;
    return false;
  }

  showDay(prevDate: string, currentDate: string): boolean {
    return this.hasDifferentDay(prevDate, currentDate);
  }

  organize(): TChatroom["organizedMessage"][] {
    const organizedMessageList: TChatroom["organizedMessage"][] = [];

    // Step 1: Deduplicate based on either id or sentAt
    const seenIds = new Set<string>();
    const seenSentAts = new Set<string>();

    const deduplicatedMessages: TChatroom["message"][] = [];

    for (const msg of this.messages) {
      const isDuplicateId = seenIds.has(msg.id);
      const isDuplicateSentAt = seenSentAts.has(msg.sentAt);

      if (!isDuplicateId && !isDuplicateSentAt) {
        seenIds.add(msg.id);
        seenSentAts.add(msg.sentAt);
        deduplicatedMessages.push(msg);
      }
    }

    // Step 2: Sort messages by arrivedAt or fallback to sentAt
    const sortedMessages = deduplicatedMessages.sort((a, b) => {
      const dateA = new Date(a.arrivedAt || a.sentAt).getTime();
      const dateB = new Date(b.arrivedAt || b.sentAt).getTime();
      return dateA - dateB;
    });

    // Step 3: Organize
    let prevDate: string, currentDate: string;

    sortedMessages.map((currentMessage: TChatroom["message"], index) => {
      const descriptors = Object.getOwnPropertyDescriptors(currentMessage); //copy properties
      const organizedMessage = Object.defineProperties(
        {},
        descriptors
      ) as TChatroom["organizedMessage"];

      const prevMessage = sortedMessages[index - 1];
      currentDate = currentMessage.arrivedAt;
      prevDate = prevMessage?.arrivedAt;

      organizedMessage.isPrimaryMessage = this.isPrimaryMessage(
        prevMessage,
        currentMessage
      );
      organizedMessage.showDay = this.showDay(prevDate, currentDate);

      organizedMessage.isCurrentUserSender =
        this.isCurrentUserSender(currentMessage);

      organizedMessage.user = this.users.find(
        (user) => user.id === currentMessage.userID
      )!;
      organizedMessage.repliedMessage = this.replies.find(
        (repliedMessage) => repliedMessage?.id === currentMessage.reply
      )!;

      organizedMessageList.push(organizedMessage);
    });
    return organizedMessageList;
  }
}
