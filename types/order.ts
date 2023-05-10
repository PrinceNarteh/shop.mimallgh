// export type OrderItem = {
//   id: string;
//   productId: string;
//   productName: string;
//   price: number;
//   quantity: number;
//   shopName: string;
//   shopId: string;
//   createdAt: string;
//   updatedAt: string;
//   orderItems: {
//     id: string;
//     orderId: string;
//     user: {
//       id: string;
//       firstName: string;
//       lastName: string;
//     };
//   }[];
// };

// export type Order = {
//   id: string;
//   amount: number;
//   orderId: string;
//   items: OrderItem[];
//   createdAt: string;
//   updatedAt: string;
// };

export interface IOrder {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  data: {
    date: string;
    items: {
      orderId: string;
      orderItems: OrderItem[];
    }[];
  }[];
}

export interface OrderItem {
  id: string;
  createdAt: string;
  updatedAt: Date;
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

// export interface Order {
//   id: string;
//   orderId: string;
//   user: {
//     id: string;
//     firstName: string;
//     lastName: string;
//   };
// }

// export interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
// }

// export interface Datum {
//   date: DateEnum;
//   items: Item[];
// }

// export enum DateEnum {
//   The9ThMay2023 = "9th May 2023",
// }

// export interface Item {
//   orderId: string;
//   orderItems: OrderItem[];
// }

// export enum FirstName {
//   John = "John",
// }

// export enum ID {
//   Gi4Gc2Xgh5Vhcyr255Nfqmjf = "gi4gc2xgh5vhcyr255nfqmjf",
// }

// export enum LastName {
//   Doe = "Doe",
// }

// export enum ShopID {
//   Bnp6Ihc6Ebolq13Tes26Vkvl = "bnp6ihc6ebolq13tes26vkvl",
// }

// export enum ShopName {
//   MiMall = "MiMall",
// }
