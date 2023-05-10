import { Loader } from "@/components";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { IOrder } from "@/types/order";
import calculatePrice from "@/utils/calculatePrice";
import { format } from "date-fns";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiSearch } from "react-icons/bi";

// interface IOrder {
//   total: number;
//   page: number;
//   perPage: number;
//   totalPages: number;
//   data: {
//     date: string;
//     items: Order[];
//   }[];
// }

const Orders = () => {
  const [orders, setOrders] = useState<IOrder>();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axiosAuth.get(
          `orders/${session?.user?.id}/shop`
        );
        console.log(data);
        setOrders(data);
      } catch (error: any) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    if (status === "authenticated") {
      fetchData();
    }
  }, [status, axiosAuth, session]);

  if (loading || !orders) return <Loader />;

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
        <table className="w-full border-separate border-spacing-y-4">
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
            {orders?.data?.map((order, idx) => (
              <React.Fragment key={idx}>
                <tr>
                  <td colSpan={4}>{order.date}</td>
                </tr>
                {order.items.map((item, i) => (
                  <tr
                    key={i}
                    onClick={() =>
                      router.push(`/orders/${order.items[0].orderId}`)
                    }
                    className="cursor-pointer rounded bg-light-gray"
                  >
                    <td className="py-5 text-center ">{i + 1}</td>
                    <td className="py-5 text-center ">{item.orderId}</td>
                    <td className="py-5 text-center">
                      {item.orderItems[0].order.user.firstName}
                      {item.orderItems[0].order.user.lastName}
                    </td>
                    <td className="py-5 text-center ">
                      {item.orderItems[0].createdAt}
                    </td>
                    <td className="py-5 text-center ">{""}</td>
                    <td className="py-5 pr-5 text-center">
                      {calculatePrice(item.orderItems)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
