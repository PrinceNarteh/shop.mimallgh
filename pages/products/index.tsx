import { Card, Status } from "@/components";
import Pagination from "@/components/Pagination";
import { axiosAuth } from "@/lib/axios";
import { Product } from "@/types/product";
import { capitalize } from "@/utils/utilities";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

interface IPage {
  products: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: {
      brand: string;
      category: string;
      createdAt: string;
      description: string;
      discountPercentage: number;
      id: string;
      images: {
        id: string;
        public_id: string;
        secure_url: string;
      }[];
      price: number;
      shop: { id: string; shopCode: string; name: string };
      stock: number;
      title: string;
      updatedAt: string;
    }[];
  };
}

const ProductList = ({ products }: IPage) => {
  const [state, setState] = useState(products);
  console.log(state);
  const router = useRouter();

  const handleClick = (id: string) => router.push(`/products/${id}`);

  return (
    <div className="mx-auto max-w-7xl">
      <Card heading="Product List">
        <div className="flex items-center rounded border border-gray-600 bg-light-gray px-2">
          <BiSearch className="text-3xl text-gray-500" />
          <input
            type="search"
            placeholder="Search for product"
            className="w-full bg-transparent p-2  outline-none "
          />
        </div>

        <table className="mt-5 w-full border-separate">
          <thead>
            <tr className="text-left text-xl">
              <th className="w-14 pb-3 text-center">
                <input type="checkbox" />
              </th>
              <th className="px-2 pb-3">Product</th>
              <th className="w-40 px-2 pb-3 text-center">Category</th>
              <th className="w-40 px-2 pb-3 text-center">Stock</th>
              <th className="w-40 px-2 pb-3 text-center">Price</th>
            </tr>
          </thead>

          <tbody className="border-separate border-spacing-10 space-y-20">
            {products.data.map((product, idx) => (
              <tr
                className={`${
                  idx % 2 === 0 && "bg-gray-500 bg-opacity-20"
                } cursor-pointer`}
                key={idx}
                onClick={() => handleClick(product.id)}
              >
                <td className="py-7 text-center">
                  <input type="checkbox" name="" id="" />
                </td>
                <td className="px-2">
                  <div className="flex items-center gap-5">
                    <div className="relative flex-shrink-0 h-12 w-14 overflow-hidden bg-teal-500">
                      <Image
                        src={product.images[0]?.secure_url}
                        style={{ objectFit: "cover" }}
                        alt={product.title}
                        sizes="48,56"
                        fill
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{product.title}</h3>
                      <p className="text-md line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-2 text-center">
                  {capitalize(product.category)}
                </td>
                <td className="px-2 text-center">{product.stock} In Stock</td>
                <td className="px-2 text-center">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div className="flex justify-center">
        <Pagination />
      </div>
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axiosAuth.get("/products");
  const products = await res.data;

  // Pass data to the page via props
  return { props: { products } };
}

export default ProductList;
