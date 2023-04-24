import { DefaultSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    shopCode: string;
    location: string;
    accessToken: string;
    refreshToken: string;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user?: User;
  }

  interface JWT {
    id: number;
    name: string;
    shopCode: string;
    location: string;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    shopCode: string;
    location: string;
    accessToken: string;
    refreshToken: string;
  }
}
