import React, { useEffect, useState } from "react";
import { Card, Loader, OrderListTable } from "@/components";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import { toast } from "react-hot-toast";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { IOrder } from "@/types/order";

const Home = () => {
  const [orders, setOrders] = useState<IOrder>();
  const axiosAuth = useAxiosAuth();
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
    <div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card heading="Total Sells">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold">$3799.00</h3>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-2xl">
                <AiOutlineRise className="font-bold text-green-500" /> 37.5%
              </div>
              <p className="text-xs">Compared to previous month</p>
            </div>
          </div>
        </Card>
        <Card heading="Average Order Value">
          <div className="flex items-center justify-between gap-5">
            <h3 className="text-xl font-extrabold">$279.00</h3>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-2xl">
                <AiOutlineFall className="font-bold text-red-500" /> 12.5%
              </div>
              <p className="text-xs">Compared to previous month</p>
            </div>
          </div>
        </Card>
        <Card heading="Total Orders">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold">600</h3>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-2xl">
                <AiOutlineRise className="font-bold text-green-500" /> 21.5%
              </div>
              <p className="text-xs">Compared to previous month</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-semibold">Recent Orders</h3>
        <OrderListTable orders={orders} />
      </div>
    </div>
  );
};

export default Home;
