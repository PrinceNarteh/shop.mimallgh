import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: number;
      userName: string;
      name: string;
      email: string;
      address: string;
      zip: string;
      role: string;
      accessToken: string;
      refreshToken: string;
    };
  }
}

/** Example on how to extend the built-in types for JWT */
declare module "next-auth/jwt" {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    bar: number;
  }
}
