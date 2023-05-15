import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { OrderItem } from "@/types/order";
import calculatePrice from "@/utils/calculatePrice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const OrderDetails = () => {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const axiosAuth = useAxiosAuth();
  const { data: session, status } = useSession();
  const {
    query: { orderId },
  } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosAuth.get(`/orders/${orderId}/order`);
      setOrder(res.data);
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, axiosAuth, orderId]);

  console.log(order);

  return (
    <div className="mx-auto max-w-7xl">
      <h3 className="my-5 text-3xl font-semibold">Order #80249</h3>
      <div className="mb-5 flex items-center divide-x border-y border-y-gray-500 py-5">
        <p className="px-5">January 15, 2023 at 12:30</p>
        <p className="px-5">{order.length} Items</p>
        <p className="px-5">Total: ${calculatePrice(order)}</p>
        <p className="px-5">Paid</p>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="col-span-8">
          <div className="flex items-center justify-between bg-gray-500 bg-opacity-20 py-4 px-4">
            <h3 className="text-xl font-bold tracking-widest">Items</h3>
            <Link href="/">Edit</Link>
          </div>
          <div>
            <table className="w-full">
              <tbody>
                {order.map((item, idx) => (
                  <tr className="border-b border-b-gray-600" key={idx}>
                    <td className="py-2 pl-4">
                      <div className="flex items-center">
                        <Image
                          className="mr-5"
                          src={""}
                          width={40}
                          height={40}
                          alt="apple"
                        />
                        <span>{item.productName}</span>
                      </div>
                    </td>
                    <td className="w-24 text-center">{item.price}</td>
                    <td className="w-20 text-center">{item.quantity}</td>
                    <td className="w-24 pr-4 text-right">
                      {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                {/* TOTAL */}
                <tr>
                  <td className="py-2 pl-4" colSpan={3}>
                    Subtotal
                  </td>
                  <td className="w-24 pr-4 text-right">$1245.34</td>
                </tr>
                <tr>
                  <td className="py-2 pl-4" colSpan={3}>
                    Tax
                  </td>
                  <td className="w-24 pr-4 text-right">$12.34</td>
                </tr>
                <tr className=" border-b border-b-gray-600">
                  <td className="py-2 pl-4" colSpan={3}>
                    Delivery
                  </td>
                  <td className="w-24 pr-4 text-right">$10.00</td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center justify-between bg-gray-500 bg-opacity-20 py-4 px-4">
              <h3 className="text-xl font-bold tracking-widest">Total</h3>
              <Link href="/">$5,882.00</Link>
            </div>
          </div>
        </div>
        <div className="max-fit col-span-4 space-y-5">
          <div className="bg-gray-500 bg-opacity-20 p-5">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-xl font-bold tracking-widest">Customer</h3>
              <Link href="/">Edit</Link>
            </div>
            <div className="flex items-center">
              <Image
                src={""}
                width={50}
                height={50}
                className="mr-3 rounded-full"
                alt=""
              />
              <div>
                <h3 className="text-xl font-bold">
                  {/* {order[0].Order.user.firstName} */}
                </h3>
                <p>This is a first order</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-500 bg-opacity-20 p-5">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-xl font-bold tracking-widest">Contact</h3>
              <Link href="/">Edit</Link>
            </div>
            <div className="flex items-center">
              <address>
                John Doe <br />
                john.doe@email.com <br />
                +233 (245) 123 4567
              </address>
            </div>
          </div>
          <div className="bg-gray-500 bg-opacity-20 p-5">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-xl font-bold tracking-widest">
                Delivery Address
              </h3>
              <Link href="/">Edit</Link>
            </div>
            <div className="flex items-center">
              <address>
                John Doe <br />
                School Bus Rd
                <br />
                Old Site, UCC <br />
                CC-123-456
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
