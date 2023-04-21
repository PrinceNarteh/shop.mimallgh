import axios from "@/lib/axios";

export const login = async (data: { email: string; password: string }) => {
  try {
    const user = await axios.post("/shop-auth/login", data);
    return user.data;
  } catch (error) {}
};

export const register = async (data: { email: string; password: string }) => {
  try {
    const user = await axios.post("/shop-auth/register", data);
    return user.data;
  } catch (error) {}
};
