type Device = {
  id: string;
  userID: string;
  token: string;
  tokenType: string;
  name: string;
  notificationDisabled: boolean;
  createdAt: string;
  updatedAt: string;
};

type TDeviceAction = {
  updateCurrentDevice: (device: Device) => void;
  updateAllDevices: (devices: Device[]) => void;
  AddDevice: (device: Device) => void;
  clearAllDevices: () => void;
};

export type TDevice = {
  device: Device;
  deviceAction: TDeviceAction;
};
