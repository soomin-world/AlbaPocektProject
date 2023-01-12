import { useParams } from "react-router-dom";
import AddWorkForm from "../components/workplace/AddWorkForm";
import WorkEditForm from "../components/workplace/WorkEditForm";

function AddWork() {
  const { id } = useParams();
  return <>{id ? <WorkEditForm /> : <AddWorkForm />}</>;
}

export default AddWork;
