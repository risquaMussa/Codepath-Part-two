import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams, useNavigate } from "react-router-dom";
import "./EditCrewmate.css";

const EditCrewmate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    name: "",
    speed: "",
    color: "",
  });

  useEffect(() => {
    const fetchMate = async () => {
      const { data, error } = await supabase
        .from("Mates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching mate:", error);
      } else {
        setPostData({
          name: data.name || "",
          speed: data.speed || "",
          color: data.color || "",
        });
      }
    };

    fetchMate();
  }, [id]);

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from("Mates").update(postData).eq("id", id);
    navigate("/gallery");
  };

  return (
    <div className="edit-crewmate-container">
      <h1>Edit Crewmate</h1>
      <form onSubmit={handleSubmit} className="edit-crewmate-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={postData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Speed:
          <input
            type="number"
            name="speed"
            value={postData.speed}
            onChange={handleChange}
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={postData.color}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Crewmate</button>
      </form>
    </div>
  );
};

export default EditCrewmate;
