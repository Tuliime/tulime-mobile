type AdProduct = {
  // To add more properties
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  priceCurrency: string;
};

export type TEcommerce = {
  adProduct: AdProduct;
};
