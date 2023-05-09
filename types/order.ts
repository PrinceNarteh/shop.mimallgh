export type OrderItem = {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  shopName: string;
  shopId: string;
  createdAt: string;
  updatedAt: string;
  order: {
    id: string;
    orderId: string;
  };
};

export type Order = {
  id: string;
  createdAt: string;
  updatedAt: string;
  orderId: string;
  amount: number;
  items: OrderItem[];
};
