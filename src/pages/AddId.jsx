import React, { useEffect, useState } from "react";
import Idcode from "../components/Idcode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { SyncLoader } from "react-spinners";

const AddId = () => {
  const [id, setId] = useState("");
  const [err, setErr] = useState(false);

  const navigate = useNavigate();
  const handelClick = () => {
    if (id.length === 4) {
      try {
        axios
          .post("https://www.fadaly.org/api/v3/cheakid", { id: id })
          .then((res) => {
            if (id.length === 4) {
              if (res.data.message === "ID Found") {
                Cookies.set("id", `${id}`);
                navigate(`/takepic`);
              } else {
                toast.error("ID غير موجود");
                setErr(false);
              }
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("ID خطأ");
    }
  };
  axios.interceptors.request.use(
    function (config) {
      // Log that a request is pending before it is sent
      setErr(true);
      return config;
    },
    function (error) {
      // Handle request errors
      return Promise.reject(error);
    }
  );

  return (
    <>
      <Toaster position="top-center" richColors />

      <div className="flex flex-col h-[calc(100vh-96px)] md:justify-center md:gap-10 justify-between items-center">
        <div className="mt-10 space-y-10 ">
          <h1 className="text-xl">Set Your Id:</h1>
          <Idcode setId={setId} id={id} />
        </div>
        <button
          onClick={handelClick}
          className="px-5 py-3 rounded-md text-white text-2xl mb-5 bg-[#FF7C0A]"
        >
          {err ? <SyncLoader color="#ffff" /> : "SAVE IT"}
        </button>
      </div>
    </>
  );
};

export default AddId;
