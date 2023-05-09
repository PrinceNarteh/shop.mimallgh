import { z } from "zod";

export const IdDto = z.object({
  id: z.string({ required_error: "ID is required" }).cuid(),
});

// {
//   brand: string;
//   category: string;
//   createdAt: string;
//   description: string;
//   discountPercentage: number;
//   id: string;
//   images: {
//     id: string;
//     public_id: string;
//     secure_url: string;
//   }
//   [];
//   price: number;
//   shop: {
//     id: string;
//     shopCode: string;
//     name: string;
//   }
//   stock: number;
//   title: string;
//   updatedAt: string;
// }

export const createProductDto = z.object({
  brand: z
    .string({ required_error: "Brand is required" })
    .min(2, "Brand should be 2 or more characters"),
  category: z.enum([
    "food",
    "fashion_and_wears",
    "grocery_and_general",
    "health_and_wellness",
    "home_and_electrical_appliances",
    "personal_services",
    "printing_and_stationery",
    "tech",
  ]),
  title: z
    .string({ required_error: "Title is required" })
    .min(2, "Title should be 2 or more characters"),
  description: z
    .string({ required_error: "Description is required" })
    .min(2, "Description should be 2 or more characters"),
  discountPercentage: z.number().gte(0, "Price cannot be negative").optional(),
  price: z
    .number({ required_error: "Price is required" })
    .gte(0, "Price cannot be negative"),
  stock: z
    .number({ required_error: "Stock is required" })
    .gte(0, "Price cannot be negative"),
  images: z.array(
    z.object({
      public_id: z.string(),
      secure_url: z.string(),
    })
  ),
});

// ratings: z
//     .number()
//     .min(1, "Minimum rating should be 1")
//     .max(5, "Maximum rating should be 5")
//     .optional(),

export type ICreateProduct = z.infer<typeof createProductDto>;

export const updateProductDto = createProductDto.partial();
export type IUpdateProduct = z.infer<typeof updateProductDto>;
