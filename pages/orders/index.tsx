import { Loader } from "@/components";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { getOrders } from "@/services/orders";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosAuth.get(`orders/${session?.user?.id}/shop`);
      setOrders(res.data);
    };
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

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
              <th className="w-10">
                <input type="checkbox" className="w-20" />
              </th>
              <th className=" w-20">No</th>
              <th className=" w-40">Ref</th>
              <th className=" w-40">Date</th>
              <th className="">Customer</th>
              <th className=" w-40">Status</th>
              <th className=" w-20 pr-5">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={idx}
                onClick={() => router.push(`/orders/${order.no}`)}
                className="cursor-pointer rounded bg-light-gray"
              >
                <td className="text-center">
                  <input type="checkbox" />
                </td>
                <td className="py-5 text-center ">{order.no}</td>
                <td className="py-5 text-center ">{order.ref}</td>
                <td className="py-5 text-center ">{order.date}</td>
                <td className="py-5 text-center">{order.customer}</td>
                <td className="py-5 text-center ">{order.status}</td>
                <td className="py-5 pr-5 text-center">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
