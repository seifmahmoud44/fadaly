import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { Toaster, toast } from "sonner";

const TakePic = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [cam, setCam] = useState(false);
  const [location, setlocation] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setstate] = useState(false);

  const param = useParams();

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((posision) => {
      setLongitude(posision.coords.longitude);
    });
    navigator.geolocation.getCurrentPosition((posision) => {
      setLatitude(posision.coords.latitude);
    });
  };

  useEffect(() => {
    if (Cookies.get("id") === undefined) {
      navigate("/addid");
    }
    check();
    startCamera();
    getLocation();
    if (cam && location) {
      console.log("yse all worked");
    }
  }, [cam, location]);
  const check = () => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        permissionStatus.state === "denied"
          ? setlocation(false)
          : setlocation(true);
      });
    navigator.permissions.query({ name: "camera" }).then((permissionStatus) => {
      permissionStatus.state === "denied" ? setCam(false) : setCam(true);
    });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play(); // Ensure the video is ready before playing
      };
      setMediaStream(stream);
    } catch (error) {
      console.log(error);
    }
  };
  axios.interceptors.request.use(
    function (config) {
      // Log that a request is pending before it is sent
      setLoading(true);
      return config;
    },
    function (error) {
      // Handle request errors
      return Promise.reject(error);
    }
  );

  const setDate = (img) => {
    try {
      const data = {
        id: Cookies.get("id"),
        attendance: !state ? "Entrance" : "Exit",
        latitude: latitude,
        longitude: longitude,
        photoData: img,
      };
      axios.post("https://www.fadaly.org/api/v3/capture", data).then((res) => {
        if (res.data.message === "Attendance captured successfully") {
          toast.success("تم التوقيع وشكرا");
          setLoading(false);
        } else {
          toast.error("يبدو ان هناك مشكلة حاول مرة اخرى");
        }
        console.log(res);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 300, 200);
    const img = canvasRef.current.toDataURL("image/png");
    setDate(img);
  };

  return (
    <div>
      <Toaster position="top-center" richColors />
      {/* No need for buttons to start and stop the camera */}
      <div className="w-5/6 m-auto max-md:w-full relative">
        {!cam || !location ? (
          <div className="absolute w-full h-full bg-black opacity-75 z-50 flex flex-col justify-center items-center gap-10">
            <p className="text-white text-2xl text-red-700">
              نرجوا تشغيل خدمات الموقع
            </p>
            <p className="text-white text-2xl text-red-700">
              نرجوا اعطاء صلاحيات الكاميرا
            </p>
          </div>
        ) : null}

        <div className="absolute w-full  m-auto bottom-0 left-0 z-20 bg-[#120E00] bg-opacity-60 ">
          <div className="flex justify-center items-center px-5 pt-5 rounded-md overflow-hidden">
            <div
              onClick={() => setstate(false)}
              className={`w-1/2 h-full text-left py-5 px-5 text-2xl font-bold transition-all   ${
                state ? "bg-[#120E00] text-gray-400" : "bg-[#FF7C0A] text-white"
              }`}
            >
              IN
            </div>
            <div
              onClick={() => setstate(true)}
              className={`w-1/2 h-full text-right py-5 px-5 text-2xl font-bold transition-all   ${
                state ? "bg-[#FF7C0A] text-white" : "bg-[#120E00] text-gray-400"
              }`}
            >
              OUT
            </div>
          </div>
          <div className="flex justify-center items-center gap-5 px-5 py-5">
            <button
              disabled={loading}
              onClick={() => {
                captureImage();
              }}
              className="flex-grow  p-3   text-white text-3xl font-bold  rounded-md bg-[#FF7C0A]"
            >
              {loading ? <SyncLoader color="#ffff" /> : "Capture"}
            </button>
            <button
              onClick={() => navigate("/history")}
              className="flex-grow  p-3   text-white text-3xl font-bold  rounded-md bg-[#FF7C0A]"
            >
              History
            </button>
          </div>
        </div>

        <video
          ref={videoRef}
          width="100%"
          style={{ height: "calc(100vh - 96px)", objectFit: "cover" }} // Set the height dynamically
          autoPlay
          playsInline
        ></video>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width="300"
          height="200"
        ></canvas>
      </div>
    </div>
  );
};

export default TakePic;
