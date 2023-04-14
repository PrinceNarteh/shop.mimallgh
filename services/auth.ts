import { httpClient } from "@/helpers/httpClient";

export const login = async (data: { email: string; password: string }) => {
  try {
    const user = await httpClient.post("/auth", data);
    return user.data;
  } catch (error) {}
};
