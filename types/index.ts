export type Category = {
  _id: string;
  title: string;
  link: string;
  image: string;
};

export type Slide = {
  _id: string;
  name: string;
  link: string;
  slug: string;
  title: string;
  description: string;
  subtitle: string;
  btn: string;
  image: string;
  textColor: string;
  createdAt: string;
};

export type Product = {
  _id: string;
  title: string;
  price: string;
  images: string[];
  category: string;
  description: string;
  real_price: string;
};

export type MidtransCheckoutSnapRequest = {
  order_id: string;
  gross_amount: string;
};
