import axios from "../axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/shop-auth/refresh", {
      refresh: session?.user?.refreshToken,
    });

    if (session && session.user)
      session.user.accessToken = res.data.accessToken;
    else signIn();
  };
  return refreshToken;
};
