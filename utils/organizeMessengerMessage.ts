import { AppDate } from "./appDate";
import { Auth } from "../types/auth";
import { TMessenger } from "@/types/messenger";

export class MessengerMessages {
  messages: TMessenger["message"][];
  currentUser: Auth["user"];

  constructor(messages: TMessenger["message"][], currentUser: Auth["user"]) {
    this.messages = messages;
    this.currentUser = currentUser;
  }

  isCurrentUserSender(message: TMessenger["message"]): boolean {
    if (this.currentUser.id === message.senderID) return true;
    return false;
  }

  isPrimaryMessage(
    prevMessage: TMessenger["message"],
    currentMessage: TMessenger["message"]
  ): boolean {
    const currentSenderId = currentMessage.senderID;
    const prevSenderId = prevMessage && prevMessage.senderID;
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

  organize(): TMessenger["organizedMessage"][] {
    const organizedMessageList: TMessenger["organizedMessage"][] = [];
    let prevDate: string, currentDate: string;
    const messageList: TMessenger["message"][] = this.messages;

    messageList.map((currentMessage: TMessenger["message"], index) => {
      const descriptors = Object.getOwnPropertyDescriptors(currentMessage); //copy properties
      const organizedMessage = Object.defineProperties(
        {},
        descriptors
      ) as TMessenger["organizedMessage"]; //create mutable object with all properties

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

      organizedMessageList.push(organizedMessage);
    });
    return organizedMessageList;
  }
}
