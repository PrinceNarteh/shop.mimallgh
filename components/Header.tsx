import React from "react";
import { GoThreeBars } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { signOut } from "next-auth/react";

interface IHeader {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ open, setOpen }: IHeader) => {
  return (
    <div
      className={`sticky top-0 flex justify-between bg-dark-gray z-50 px-5 py-2 duration-300`}
    >
      <GoThreeBars
        className="text-3xl cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      <div className="flex items-center">
        {/* Search  */}
        <div className="px-6 flex items-center gap-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <BiSearch />
            </div>
            <input
              type="text"
              className="w-full rounded pl-8 pr-4 py-2.5 text-xs font-light bg-gray-800 text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
              placeholder="search"
            />
          </div>
          <button onClick={() => signOut({ callbackUrl: "/auth/login" })}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
