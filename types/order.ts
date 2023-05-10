export interface OrderItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  shopName: string;
  shopId: string;
  order: {
    id: string;
    orderId: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
}

// export interface IOrder {
//   total: number;
//   page: number;
//   perPage: number;
//   totalPages: number;
//   data: {
//     date: string;
//     items: {
//       orderId: string;
//       orderItems: OrderItem[];
//     }[];
//   }[];
// }

export interface IOrder {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  data: {
    date: string;
    orders: {
      orderId: string;
      orderItems: OrderItem[];
    }[];
  }[];
}

export interface OrderItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  shopName: string;
  shopId: string;
  order: {
    id: string;
    orderId: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
}
