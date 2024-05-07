import { Outlet, useLocation } from "react-router-dom";
import Header from "../assets/components/Header";
import { useEffect, useState } from "react";

function Root() {
  const [isDark, setDark] = useState(false);

  function changeLight() {
    setDark(!isDark);
  }
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const date = new Date();
  // console.log("🚀 ~ file: Root.jsx:12 ~ Root ~ date:", date);
  return (
    <>
      <nav>
        <Header isDark={isDark} changeLight={changeLight} />
      </nav>

      <Outlet context={{ isDark }} />
      <footer>
        <div
          className={`${
            isDark ? "bg-customCardDarK" : "bg-orange-400"
          } text-customText md:text-xl  text-center py-12`}>
          <h1>{`©${date.getFullYear()} Natours All right reserved `}</h1>
        </div>
      </footer>
    </>
  );
}

export default Root;
