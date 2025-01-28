type FarmInput = {
  id: string;
  name: string;
  purpose: string;
  category: string;
  imageUrl: string;
  imagePath: string;
  price: number;
  priceCurrency: string;
  Source: string;
  sourceUrl: string;
  createdAt: string;
  updatedAt: string;
};

type GetFarmInput = {
  limit: number;
  category?: string;
  cursor?: string;
};

type GetById = {
  id: string;
};

export type TFarmInput = {
  farminput: FarmInput;
  getFarmInput: GetFarmInput;
  getById: GetById;
};
