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

    const isDifferentSender = currentSenderId !== prevSenderId;

    if (isDifferentSender) {
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
    let prevDate: string, currentDate: string;
    const messageList: TChatroom["message"][] = this.messages;

    messageList.map((currentMessage: TChatroom["message"], index) => {
      const descriptors = Object.getOwnPropertyDescriptors(currentMessage); //copy properties
      const organizedMessage = Object.defineProperties(
        {},
        descriptors
      ) as TChatroom["organizedMessage"]; //create mutable object with all properties

      const prevMessage = messageList[index - 1];
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
        (repliedMessage) => repliedMessage.id === currentMessage.id
      )!;

      organizedMessageList.push(organizedMessage);
    });
    return organizedMessageList;
  }
}
