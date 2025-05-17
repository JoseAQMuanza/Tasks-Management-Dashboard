import { Link } from "react-router-dom";
import Form from "../components/form/form";

const NewUser = () => {
  return (
    <div>
      <Link to="/">
        <button className="bg-blue-500 m-3 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
          Back to Dashboard
        </button>
      </Link>
      <Form />
    </div>
  );
}

export default NewUser;