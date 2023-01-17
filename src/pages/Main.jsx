import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import WorkPlace from "../components/workplace/WorkPlace";

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
      <WorkPlace />
      <Footer />
    </>
  );
}

export default Main;
