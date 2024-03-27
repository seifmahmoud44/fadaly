import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(data);
    if (Cookies.get("id") === undefined) {
      navigate("/addid");
    }
    const getData = async () => {
      try {
        axios
          .get(`https://www.fadaly.org/api/v3/last10/${Cookies.get("id")}`)
          .then((res) => {
            setData(res.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  return (
    <div className="p-5 space-y-5 flex flex-col justify-between items-center h-[calc(100vh-96px)]">
      <div className="flex-grow space-y-5 ">
        {data &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className="p-5 space-y-5 border border-[#120E00] rounded-md"
              >
                <h1 className="text-[#120E00] text-xl">{item.day}</h1>
                <div className="relative w-full h-18  flex justify-between items-center">
                  <div className=" px-2 bg-[#120E00] rounded-md h-14  text-white flex justify-center items-center">
                    <h1>{item.in_time}</h1>
                  </div>
                  <div className="absolute bg-transparent -z-10 border-t-4 border- border-t-[#FF7C0A]  w-full"></div>
                  <div className="px-2 bg-[#120E00] rounded-md h-14  text-white flex justify-center items-center ">
                    <h1>{item.out_time}</h1>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <button
        onClick={() => navigate("/takepic")}
        className=" p-3   text-white text-3xl font-bold  rounded-md bg-[#FF7C0A]"
      >
        TAKE PICTURE
      </button>
    </div>
  );
};

export default History;
