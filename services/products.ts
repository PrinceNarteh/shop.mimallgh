import axios, { axiosAuth } from "@/lib/axios";
import { ICreateProduct, IUpdateProduct } from "@/utils/validations";

export const allProducts = async () => {
  const res = await axiosAuth.get("/products");
  return res.data;
};

export const getProduct = async (productId: string) => {
  const res = await axios.get(`/products/${productId}`);
  return res.data;
};

export const createProduct = async (createProduct: ICreateProduct) => {
  const res = await axiosAuth.post("/products", createProduct);
  return res.data;
};

export const updateProduct = async (
  productId: string,
  updateProduct: IUpdateProduct
) => {
  const res = await axiosAuth.patch(`/products/${productId}`, updateProduct);
  return res.data;
};

export const deleteProduct = async (productId: string) => {
  const res = await axiosAuth.delete(`/products/${productId}`);
  return res.data;
};
