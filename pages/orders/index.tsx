import { Loader } from "@/components";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { getOrders } from "@/services/orders";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import _ from "lodash";

interface IOrder {
  date: string;
  items: { orderId: string; orderItems: any[] }[];
}

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  console.log(session?.user?.id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axiosAuth.get(`orders/${session?.user?.id}/shop`);
      let res = _.chain(data)
        .groupBy("createdAt")
        .map((value, i) => ({
          date: i,
          items: _.chain(value)
            .groupBy("Order.orderId")
            .map((val, idx) => ({
              orderId: idx,
              user: `${val[0].Order.user.firstName} ${val[0].Order.user.lastName}`,
              orderItems: val,
            }))
            .value(),
        }))
        .value();
      setOrders(res);
      console.log(res);
      setLoading(false);
    };
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

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
              <th className=" w-20 pr-5">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((orderItem, idx) => (
              <>
                <tr>
                  <td colSpan={4}>{orderItem.date}</td>
                </tr>
                {orderItem.items.map((item, i) => (
                  <tr
                    key={idx}
                    onClick={() => router.push(`/orders/${orderItem.no}`)}
                    className="cursor-pointer rounded bg-light-gray"
                  >
                    <td className="py-5 text-center ">{idx + 1}</td>
                    <td className="py-5 text-center ">
                      {orderItem.items[0].orderId}
                    </td>
                    <td className="py-5 text-center">{item.user}</td>
                    {/* <td className="py-5 text-center ">{orderItem.date}</td>
                    <td className="py-5 text-center ">{orderItem.status}</td>
                    <td className="py-5 pr-5 text-center">
                      {orderItem.amount}
                    </td> */}
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
