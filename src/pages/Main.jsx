import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import LayOut from "../components/layout/LayOut";
import WorkPlace from "../components/workplace/WorkPlace";

function Main() {
  const navigate = useNavigate();
  const token = localStorage.getItem("is_login");

  console.log(token);

  useEffect(() => {
    if (!token) {
      navigate("/start");
    }
  }, []);

  return (
    <>
      <LayOut height="100vh">
        <WorkPlace />
      </LayOut>
    </>
  );
}

export default Main;
