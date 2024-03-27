import React, { useState } from "react";
import Idcode from "../components/Idcode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AddId = () => {
  const [id, setId] = useState();
  const [err, setErr] = useState(false);

  const navigate = useNavigate();
  const handelClick = () => {
    if (id.length === 4) {
      Cookies.set("id", `${id}`);
      navigate(`/takepic/${id}`);
    } else {
      console.log("no");
      setErr(true);
    }
  };
  return (
    <div className="flex flex-col h-[calc(100vh-96px)] md:justify-center md:gap-10 justify-between items-center">
      <div className="mt-10 space-y-10 ">
        <h1 className="text-xl">Set Your Id:</h1>
        <Idcode setId={setId} id={id} />
      </div>
      <button
        onClick={handelClick}
        className="px-5 py-3 rounded-md text-white text-2xl mb-5 bg-[#FF7C0A]"
      >
        SAVE IT
      </button>
    </div>
  );
};

export default AddId;
