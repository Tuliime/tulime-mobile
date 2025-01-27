type FarmManager = {
  id: string;
  userID: string;
  name: string;
  email: string;
  gender: string;
  regNo: string;
  telNumber: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

type GetFarmManager = {
  limit: number;
};

export type TFarmManager = {
  farmmanager: FarmManager;
  getFarmmanager: GetFarmManager;
};
