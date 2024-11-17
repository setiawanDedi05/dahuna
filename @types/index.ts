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
  id?: string;
  quantity: number;
  price: number;
  productId: string;
  userId: string;
  status?: string;
  checked: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;

  Product?: Product;
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

export type Kecamatan = {
  id: string;
  id_kota: string;
  name: string;
};

export type Provinsi = {
  id: string;
  name: string;
};

export type Kota = {
  id: string;
  id_provinsi: string;
  name: string;
};

export type Kelurahan = {
  id: string;
  id_kecamatan: string;
  name: string;
};

export type Address = {
  id: string;
  provinsiId: string;
  kotaId: string;
  kecamatanId: string;
  kelurahanId: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  kelurahan: string;
  kodePos: string;
  detail: string;
  name: string;
  noTelp: string;
};

export type Expedition = {
  summary: SummaryExpedition;
  costs: CostExpedition[];
};

export type SummaryExpedition = {
  courier: string[];
  origin: string;
  destination: string;
  weight: string;
};

export type CostExpedition = {
  code: string;
  name: string;
  service: string;
  type: string;
  price: string;
  estimated: string;
};
