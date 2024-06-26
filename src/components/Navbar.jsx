import { useState } from "react";
import logo from "../images/LOGO fadaly.png";
import Idcode from "./Idcode";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const [id, setId] = useState(Cookies.get("id"));
  const url = useLocation();
  return (
    <div className="h-24">
      <div className="w-5/6 h-full m-auto py-5 max-md:w-full px-5 flex justify-between items-center gap-6 ">
        <img src={logo} alt="" className="h-full" />
        {url.pathname !== "/addid" && (
          <div className="py-5 w-52 flex justify-center items-center">
            <h1 className="text-[#120E00] text-2xl font-bold">ID</h1>
            <Idcode disabeled={true} setId={setId} id={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
