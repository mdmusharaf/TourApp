// import { Link } from "react-router-dom";

import { Link } from "react-router-dom";
import { BsSun, BsMoonStars } from "react-icons/Bs";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
const Header = ({ isDark, changeLight }) => {
  const [open, setOpen] = useState(false);
  function toggle() {
    setOpen(!open);
    changeLight(!open);
  }
  return (
    <>
      <div className="relative w-full ">
        <nav
          className={`${
            isDark ? "bg-customDark  " : "bg-orange-400"
          } flex justify-between items-center shadow-sm fixed top-0  w-full  text-customText py-4  px-8`}>
          <div>
            <h1 className="sm:text-4xl text-2xl ">#Natours App</h1>
          </div>
          <div className="items-center flex">
            <Link
              to={"/"}
              className="text-xl px-4 hidden sm:block text-gray-200 hover:text-gray-500 hover:underline">
              Tours
            </Link>
            <Link
              to={"/addtour"}
              className="text-xl px-4 text-gray-200 hidden sm:block hover:text-gray-500 hover:underline">
              Add Tours
            </Link>
            <span
              className="inline-block px-2 py-2 mx-4 bg-white text-orange-400 rounded-md  blur-1 cursor-pointer"
              onClick={toggle}>
              {open ? (
                <BsSun className="text-2xl" />
              ) : (
                <BsMoonStars className="text-2xl" />
              )}
            </span>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
