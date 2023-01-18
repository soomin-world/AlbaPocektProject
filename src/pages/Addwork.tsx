import { useParams } from "react-router-dom";
import LayOut from "../components/layout/LayOut";
import AddWorkForm from "../components/workplace/AddWorkForm";
import WorkEditForm from "../components/workplace/WorkEditForm";

function AddWork() {
  const { id } = useParams();
  return <LayOut>{id ? <WorkEditForm /> : <AddWorkForm />}</LayOut>;
}

export default AddWork;
