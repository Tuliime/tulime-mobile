type Notification = {
  id: string;
  userID: string;
  title: string;
  body: string;
  data?: string; // Optional since it can be empty
  icon?: string;
  attachments?: string; // Stringified JSON
  isRead: boolean;
  sendStatusCode: number;
  type: string;
  createdAt: string; // ISO string format for timestamps
  updatedAt: string;
};

type SSEData = {
  type: string;
  data: any;
};

type TNotificationAction = {
  updateAllNotificationCount: (count: number) => void;
  updateChatNotificationCount: (count: number) => void;
  updateAllNotifications: (notifications: Notification[]) => void;
  addNotifications: (notification: Notification) => void;
  clearAllNotification: () => void;
};

type NotificationAPIResponse = {
  allNotificationCount: number;
  chatNotificationCount: number;
  notifications: Notification[];
};

export type TNotification = {
  allNotificationCount: number;
  chatNotificationCount: number;
  notification: Notification;
  notificationAction: TNotificationAction;
  notificationAPIResponse: NotificationAPIResponse;
  sseData: SSEData;
};
