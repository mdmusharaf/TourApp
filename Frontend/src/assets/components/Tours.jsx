import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/Ai";
import { Link, useOutletContext } from "react-router-dom";
import { ImSpinner6 } from "react-icons/Im";
// eslint-disable-next-line react/prop-types
export const ratings = (rating) => {
  const stars = Array.from({ length: 5 }, (el, index) => {
    return rating > index + 1 ? (
      <FaStar key={index} className="text-yellow-400" />
    ) : rating > index + 0.5 ? (
      <FaStarHalfAlt key={index} className="text-yellow-400" />
    ) : (
      <AiOutlineStar key={index} className="text-yellow-400" />
    );
  });
  return stars;
};
const Tours = () => {
  const [tours, getTours] = useState([]);
  const { isDark } = useOutletContext();
  // console.log(isDark);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/tours");
        const req = await response.json();
        console.log(req);
        getTours(req.data.tours);
      } catch (error) {
        alert("Failed to fetch");
      }
    };
    fetchData();
  }, []);

  // const ratings = (rating) => {
  //   // console.log(rating);
  //   const stars = Array.from({ length: 5 }, (el, index) => {
  //     console.log(Math.floor(rating));
  //     Math.floor(rating) > index + 1 ? (
  //       <FaStar className="text-yellow-400" />
  //     ) : (
  //       <FaStarHalfAlt className="text-yellow-500" />
  //     );
  //   });
  //   console.log(stars);
  //   return stars;
  // };

  // const dateConvert = (change) => {
  //   const date = new Date(change);
  //   return date.toLocaleDateString();
  // };
  const elems = tours.map((tours) => (
    <div
      className={`${
        isDark ? "bg-customCardDarK " : "bg-customCardBG "
      } w-full shadow-md rounded`}
      key={tours._id}>
      <img
        src={`http://localhost:4000/${tours.imageCover}`}
        className="h-[350px] min-w-full bg-cover bg-no-repeat bg-center"
        alt="not uploaded"
      />

      <div className="px-6 pb-8">
        <p className="uppercase pt-4 text-gray-500">
          {`${tours.difficulty} - ${tours.duration}/day Tour`}
        </p>
        <h1 className="md:text-4xl text-2xl py-2 text-orange-400">
          {tours.name}
        </h1>
        <h3 className="text-base pb-4 text-gray-500">{tours.summary}</h3>
        <div className="flex justify-between items-center">
          <p
            className={`${
              isDark ? "text-customLight" : "text-customDark"
            } text-2xl`}>
            {`$${tours.price} `}
            <span className="text-sm  text-gray-400">/per person</span>
          </p>

          <div className="flex justify-between">
            {ratings(tours.ratingsAverage)}
          </div>
        </div>
        <Link to={`tours/${tours._id}`} key={tours._id}>
          <button className="bg-orange-400 w-full mt-6 rounded-md hover:bg-orange-300 text-white  py-2">
            View Details
          </button>
        </Link>
      </div>
    </div>
  ));

  return tours.length ? (
    <div
      className={`${
        isDark ? "bg-customDark" : " bg-customLight "
      } md:grid-cols-2 grid lg:grid-cols-3 gap-6 px-10 pt-28  pb-14`}>
      {elems}
    </div>
  ) : (
    <div
      className={`${
        isDark ? "bg-customDark" : " bg-customLight"
      } flex h-screen justify-center items-center`}>
      <span className="text-5xl transition-all duration-150 text-orange-400 text-center animate-spin">
        <ImSpinner6 />
      </span>
    </div>
  );
};
export default Tours;
