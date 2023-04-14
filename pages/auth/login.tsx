import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-200">
      <div className="bg-white text-gray-600 p-7 max-w-md w-full rounded-md">
        <div className="flex justify-center mb-7">
          <div className="absolute bg-teal-500 flex justify-center items-center w-20 h-20 transform -translate-y-16 rounded-full">
            M
          </div>
        </div>
        <div className="my-7 text-center">
          <h1 className="text-4xl">Log In</h1>
          <p className="text-gray-400 text-sm">
            Enter your credentials to login
          </p>
        </div>

        <form className="space-y-3">
          <div>
            <label htmlFor="" className="block text-md mb-1">
              Email or Phone number
            </label>
            <input type="text" className="border w-full p-2" />
          </div>
          <div>
            <label htmlFor="" className="block text-md mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border w-full p-2"
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="bg-blue-800 text-white w-full py-2 rounded cursor-pointer"
          />
        </form>

        <p className="text-center text-sm mt-3">
          Don't have account?{" "}
          <Link href="/auth/register" className="text-orange-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
