import Cookies from "js-cookie";
import React, { useEffect, useRef } from "react";

const Idcode = ({ disabeled, id, setId }) => {
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();

  const handelInput = (e) => {
    setId(
      `${input1.current.value}${input2.current.value}${input3.current.value}${input4.current.value}`
    );
    if (input1.current.value.length >= 1) {
      input2.current.focus();
    }
    if (input2.current.value.length >= 1) {
      input3.current.focus();
    }
    if (input3.current.value.length >= 1) {
      input4.current.focus();
    }

    if (e.key === "Backspace") {
      if (input4.current.value.length === 0) {
        input3.current.focus();
      }
      if (input3.current.value.length === 0) {
        input2.current.focus();
      }
      if (input2.current.value.length === 0) {
        input1.current.focus();
      }
    }
  };

  useEffect(() => {
    // input1.current.value = parseInt(id[1]);
    if (Cookies.get("id")) {
      const idArr = Cookies.get("id").split("");
      const inputsArr = [input1, input2, input3, input4];
      for (let i = 0; i < idArr.length; i++) {
        inputsArr[i].current.value = parseInt(idArr[i]);
      }
    }
  }, [id]);
  return (
    <div>
      <form id="otp-form">
        <div className="flex items-center justify-center gap-3">
          <input
            disabled={disabeled}
            onChange={handelInput}
            onKeyDown={handelInput}
            ref={input1}
            type="number"
            className={`input  disabled:opacity-75 w-1/4 max-w-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-1 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
            pattern="\d*"
          />
          <input
            disabled={disabeled}
            onChange={handelInput}
            onKeyDown={handelInput}
            ref={input2}
            type="number"
            className={`input  disabled:opacity-75 w-1/4 max-w-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-1 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
          />
          <input
            disabled={disabeled}
            onChange={handelInput}
            onKeyDown={handelInput}
            ref={input3}
            type="number"
            className={`input  disabled:opacity-75 w-1/4 max-w-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-1 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
          />
          <input
            disabled={disabeled}
            onChange={handelInput}
            onKeyDown={handelInput}
            ref={input4}
            type="number"
            className={`input  disabled:opacity-75 w-1/4 max-w-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-1 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
          />
        </div>
      </form>
    </div>
  );
};

export default Idcode;
