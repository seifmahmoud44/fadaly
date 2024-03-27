import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect } from "react";

const History = () => {
  useEffect(() => {
    const getData = async () => {
      try {
        axios
          .get(`https://www.fadaly.org/api/v3/last10/${Cookies.get("id")}`)
          .then((res) => {
            console.log(res.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  });
  return (
    <div>
      <div>
        <h1>gate</h1>
        <div className="relative"></div>
      </div>
    </div>
  );
};

export default History;
