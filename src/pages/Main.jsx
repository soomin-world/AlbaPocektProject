import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import LayOut from "../components/layout/LayOut";
import WorkPlace from "../components/workplace/WorkPlace";
import MyAlert from "../components/alert/MyAlert";

function Main() {
  const navigate = useNavigate();
  const token = localStorage.getItem("is_login");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <LayOut height="100vh">
        <WorkPlace />
        {/* <Footer /> */}
        <MyAlert />
      </LayOut>
    </>
  );
}

export default Main;
