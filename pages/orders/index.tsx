import { Loader } from "@/components";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Order } from "@/types/order";
import calculatePrice from "@/utils/calculatePrice";
import { format } from "date-fns";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

interface IOrder {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  date: string;
  data: Order[];
}

const Orders = () => {
  const [orders, setOrders] = useState<IOrder>({
    data: [],
    total: 0,
    page: 1,
    perPage: 10,
    totalPages: 1,
    date: "",
  });
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axiosAuth.get(`orders/${session?.user?.id}/shop`);
      setOrders(data);
      setLoading(false);
    };
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  console.log(orders);

  if (loading) return <Loader />;

  return (
    <div className="mx-auto max-w-5xl">
      <div className=" flex justify-center">
        <div className="flex items-center rounded-lg border p-2">
          <input
            className="bg-transparent outline-none"
            type="search"
            name=""
            id=""
            placeholder="Search order..."
          />
          <BiSearch className="text-3xl text-gray-500" />
        </div>
      </div>
      <div className="w-full py-4 px-2">
        <table className="w-full border-separate border-spacing-y-7">
          <thead>
            <tr>
              <th className=" w-20">No</th>
              <th className=" w-20">Order Id</th>
              <th className="w-40">Customer</th>
              <th className=" w-40">Date</th>
              <th className=" w-40">Status</th>
              <th className=" w-20 pr-5">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.data.map((orderItem, idx) => (
              <>
                <tr>
                  <td colSpan={4}>{orderItem.date}</td>
                </tr>
                {orderItem.items.map((item) => (
                  <tr
                    key={idx}
                    onClick={() =>
                      router.push(`/orders/${orderItem.items[0].order.id}`)
                    }
                    className="cursor-pointer rounded bg-light-gray"
                  >
                    <td className="py-5 text-center ">{idx + 1}</td>
                    <td className="py-5 text-center ">{item.orderId}</td>
                    <td className="py-5 text-center">{item.user}</td>
                    <td className="py-5 text-center ">{orderItem.date}</td>
                    <td className="py-5 text-center ">{""}</td>
                    <td className="py-5 pr-5 text-center">
                      {calculatePrice(item.orderItems)}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
