import { useState } from "react";
import logo from "../images/LOGO fadaly.png";
import Idcode from "./Idcode";
const Navbar = () => {
  const [id, setId] = useState("7777");
  return (
    <div className="h-24">
      <div className="w-5/6 h-full m-auto py-5 max-md:w-full px-5 flex justify-between items-center gap-6 ">
        <img src={logo} alt="" className="h-full" />
        <div className="py-5 w-52">
          <Idcode disabeled={true} setId={setId} id={id} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
