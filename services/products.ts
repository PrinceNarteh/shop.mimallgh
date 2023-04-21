import axios, { axiosAuth } from "@/lib/axios";
import catchAsyncErrors from "@/utils/catchAsyncErrors";
import { ICreateProduct, IUpdateProduct } from "@/utils/validations";

export const allProducts = catchAsyncErrors(async () => {
  const res = await axiosAuth.get("/products");
  return res.data;
});

export const getProduct = catchAsyncErrors(async (productId: string) => {
  const res = await axios.get(`/products/${productId}`);
  return res.data;
});

export const createProduct = catchAsyncErrors(
  async (createProduct: ICreateProduct) => {
    const res = await axiosAuth.post("/products", createProduct);
    return res.data;
  }
);

export const updateProduct = catchAsyncErrors(
  async (productId: string, updateProduct: IUpdateProduct) => {
    const res = await axiosAuth.patch(`/products/${productId}`, updateProduct);
    return res.data;
  }
);

export const deleteProduct = catchAsyncErrors(async (productId: string) => {
  const res = await axiosAuth.delete(`/products/${productId}`);
  return res.data;
});
