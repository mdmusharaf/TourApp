import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { ratings } from "./Tours";

const TourDetail = () => {
  const [tourDetail, setTourDetail] = useState([]);
  const params = useParams();
  const { isDark } = useOutletContext();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4000/api/tours/${params.id}`
      );
      const req = await response.json();
      console.log("🚀 ~ file: TourDetail.jsx:14 ~ fetchData ~ req:", req);
      setTourDetail(req.data.tour);
    };
    fetchData();
  }, [params.id]);
  return (
    <div
      className={`${
        isDark ? "bg-customDark" : "bg-customLight"
      } grid  md:grid-cols-2 pb-12 px-10 pt-28`}>
      <div className="">
        <img
          src={`http://localhost:4000/${tourDetail.imageCover}`}
          alt=""
          className="m-w-full bg-cover h-auto bg-center"
        />
      </div>
      <div className="flex flex-col justify-center items-start md:px-16 md:pt-0 pt-4 px-2">
        <p className="text-sm py-3 text-gray-400">{tourDetail.summary}</p>

        <h1 className="text-3xl pb-4 text-orange-400">{tourDetail.name}</h1>
        <p className="text-gray-400 text-sm">{tourDetail.description}</p>

        <div className="flex justify-between pt-4  ">
          {" "}
          {ratings(tourDetail.ratingsAverage)}
        </div>
        <button className="w-full py-2 rounded mt-6 bg-orange-400 text-white">
          Buy Tour
        </button>
      </div>
    </div>
  );
};

export default TourDetail;
