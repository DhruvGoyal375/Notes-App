import { Link } from "react-router-dom";
import add from "../assets/add.svg";
const AddButton = () => {
  return (
    <div>
      <Link to="/note/new" className="floating-button">
        <img src={add} className="add-button" />
      </Link>
    </div>
  );
};

export default AddButton;
