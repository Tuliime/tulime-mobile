type VetDoctor = {
  id: string;
  userID: string;
  name: string;
  email: string;
  gender: string;
  licenseNumber: string;
  telNumber: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

type GetVetDoctor = {
  limit: number;
};

export type TVetDoctor = {
  vetdoctor: VetDoctor;
  getVetDoctor: GetVetDoctor;
};
