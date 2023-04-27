import { AddProductForm } from "@/components";
import { getProduct } from "@/services/products";
import { Product } from "@/types/product";
import { GetServerSideProps } from "next";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.query;
  const data = await getProduct(productId as string);

  return {
    props: {
      product: data,
    },
  };
};

const EditProduct = ({ product }: { product: Product }) => {
  return (
    <div>
      <AddProductForm product={product} />
    </div>
  );
};

export default EditProduct;
