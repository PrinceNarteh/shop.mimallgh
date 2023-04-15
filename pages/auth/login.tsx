import Image from "next/image";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-200">
      <div className="bg-white text-gray-600 p-7 max-w-md w-full rounded-md mx-3">
        <div className="flex justify-center mb-7">
          <div className="absolute bg-white flex justify-center items-center w-24 h-24 transform -translate-y-20 rounded-full shadow-md">
            <Image src="/logo.png" alt="" width={50} height={50} />
          </div>
        </div>
        <div className="my-7 text-center">
          <h1 className="text-4xl font-bold text-green-800">Log In</h1>
          <p className="text-gray-400 text-sm">
            Enter your credentials to login
          </p>
        </div>

        <form className="space-y-3">
          <input
            type="text"
            placeholder="Email or Phone Number"
            className="border border-gray-400 w-full p-3 rounded text-lg focus:border-2 outline-green-800"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-400 w-full p-3 rounded text-lg focus:border-2 outline-green-800"
          />
          <input
            type="submit"
            value="Login"
            className="bg-green-800 text-white w-full py-3 text-lg rounded cursor-pointer"
          />
        </form>

        <p className="text-center text-sm mt-3">
          Don't have account?{" "}
          <Link href="/auth/register" className="text-green-900 font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
