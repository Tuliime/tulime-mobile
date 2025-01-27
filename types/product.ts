// export type TProduct = {
//   id: string;
//   name: string;
//   category: string;
//   image: any;
//   price: number;
//   currency: string;
// };
type TPrice = {
  id: string;
  agroproductID: string;
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
};

type TProduct = {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
  Price: TPrice[];
};

type TGetAgroProductInput = {
  limit: number;
  category?: string;
  cursor?: string;
};

export type TAgroproducts = {
  product: TProduct;
  getAgroProduct: TGetAgroProductInput;
};
