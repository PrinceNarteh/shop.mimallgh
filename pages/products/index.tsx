import { Card } from "@/components";
import Pagination from "@/components/Pagination";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Product } from "@/types/product";
import { capitalize } from "@/utils/utilities";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";

interface IPage {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Product[];
}

const ProductList = () => {
  const [state, setState] = useState<IPage>({
    data: [],
    page: 1,
    perPage: 10,
    total: 1,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { data: session, status } = useSession();

  const fetchData = async (page: number) => {
    const res = await axiosAuth.get(
      `/products?shopId=${session?.user?.id}&page=${page}&search=${search}`
    );
    setState(res.data);
  };

  const handlePrev = async (page: number) => {
    const res = await axiosAuth.get(
      `/products?shopId=${session?.user?.id}&page=${page - 1}&search=${search}`
    );
    setState(res.data);
  };

  const handleNext = async (page: number) => {
    const res = await axiosAuth.get(
      `/products?shopId=${session?.user?.id}&page=${page + 1}&search=${search}`
    );
    setState(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosAuth.get(
        `/products?shopId=${session?.user?.id}&search=${search}&perPage=10`
      );
      setState(res.data);
    };
    if (search !== "") {
      fetchData();
    }
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosAuth.get(
        `/products?shopId=${session?.user?.id}&page=1`
      );
      console.log(res);
      setState(res.data);
    };
    if (status === "authenticated") {
      fetchData();
    }
  }, [status, axiosAuth, session]);

  const handleClick = (id: string) => router.push(`/products/${id}`);
  console.log(state);

  return (
    <div className="mx-auto max-w-7xl">
      <Card heading="Product List">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center rounded border border-gray-600 bg-light-gray px-2">
            <BiSearch className="text-3xl text-gray-500" />
            <input
              type="search"
              placeholder="Search for product"
              className="w-full bg-transparent p-2  outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>

        <table className="mt-5 w-full border-separate">
          <thead>
            <tr className="text-left text-xl">
              <th className="w-14 pb-3 text-center">NO.</th>
              <th className="px-2 pb-3">Product</th>
              <th className="w-40 px-2 pb-3 text-center">Category</th>
              <th className="w-40 px-2 pb-3 text-center">Stock</th>
              <th className="w-40 px-2 pb-3 text-center">Price</th>
            </tr>
          </thead>

          <tbody className="border-separate border-spacing-10 space-y-20">
            {state.data.map((product, idx) => (
              <tr
                className={`${
                  idx % 2 === 0 && "bg-gray-500 bg-opacity-20"
                } cursor-pointer`}
                key={idx}
                onClick={() => handleClick(product.id)}
              >
                <td className="py-7 text-center">
                  {state.page === 1
                    ? state.page * (idx + 1)
                    : state.page + (idx + 1).toString()}
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
        <Pagination
          page={state.page}
          perPage={state.perPage}
          totalPages={state.totalPages}
          fetchData={fetchData}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
    </div>
  );
};

export default ProductList;
