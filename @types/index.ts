export type Category = {
  id: string;
  title: string;
  image: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Slide = {
  title: string;
  image: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  name: string;
  description: string | null;
  priceReal: number;
  priceDisplay: number;
  categoryId: string;
  Images: ProductImages[];
};

export type MidtransCheckoutSnapRequest = {
  order_id: string;
  gross_amount: string;
};

export type Cart = {
  id: string;
  quantity: number;
  price: number;
  productId: string;
  userId: string;
  status?: string;
  createdAt: string | Date;
  updatedAt: string | Date;

  Product: Product;
};

export type ProductImages = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  productId?: string | null;
};

export enum SortingEnum {
  Alphabetic = "Alphabetic",
  PriceToHigh = "Price Low To High",
  PriceToLow = "Price High To Low",
  Latest = "Latest",
}
