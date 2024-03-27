import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import Cookies from "js-cookie";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("id") === undefined) {
      navigate("/addid");
    } else {
      navigate("/takepic");
    }
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
