export type Category = {
  id: string;
  title: string;
  image: string;
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
  _id: string;
  productId: string;
  userId: string;
  quantity: number;
  price: number;
  product: Product;
  user?: {
    id: string;
  };
};

export type ProductImages = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  productId: string | null;
};
