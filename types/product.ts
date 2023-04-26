type ICategory =
  | "food"
  | "fashion_and_wears"
  | "grocery_and_general"
  | "health_and_wellness"
  | "home_and_electrical_appliances"
  | "personal_services"
  | "printing_and_stationery"
  | "tech";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: ICategory;
  rating: number[];
  shopId: string;
  images: {
    id: string;
    public_id: string;
    secure_url: string;
  }[];
};
