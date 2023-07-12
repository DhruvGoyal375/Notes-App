import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowLeft from "../assets/arrow-left.svg";
import { useNavigate } from "react-router-dom";
const NotePage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [id]);
  const history = useNavigate();
  const getNote = async () => {
    if (id === "new") return;
    const response = await fetch(`http://127.0.0.1:8000/api/notes/${id}`);
    const data = await response.json();
    setNote(data);
  };

  const createNote = async () => {
    fetch(`http://127.0.0.1:8000/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  const updateNote = async () => {
    fetch(`http://127.0.0.1:8000/api/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  const deleteNote = async () => {
    fetch(`http://127.0.0.1:8000/api/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    history("/");
  };
  const handleSubmit = () => {
    console.log("NOTE:", note);
    if (id !== "new" && note.body == "") {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && note.body !== null) {
      createNote();
    }
    history.push("/");
  };
  const handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
    console.log("Handle Change:", note);
  };
  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
