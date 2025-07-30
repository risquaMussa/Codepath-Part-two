import { useEffect, useState } from "react";
import { supabase } from "../client";
import "./CrewmateGallery.css";
import { useNavigate } from "react-router-dom";

const CrewmateGallery = () => {
  const [mates, setMates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMates = async () => {
      const { data, error } = await supabase.from("Mates").select("*");
      if (error) {
        console.error("Error fetching Mates:", error);
      } else {
        setMates(data);
      }
    };

    fetchMates();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("Mates").delete().eq("id", id);
    if (error) {
      console.error("Error deleting crewmate:", error);
    } else {
      setMates((prev) => prev.filter((mate) => mate.id !== id));
      console.log("Crewmate deleted successfully");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "2em" }}>All Crewmates</h1>
      <div className="gallery">
        {mates.map((mate) => (
          <div key={mate.id} className="mate-card">
            <h3>{mate.name}</h3>
            <p>Speed: {mate.speed} mph</p>
            <p>Color: {mate.color}</p>
            <button className="button-edit" onClick={() => handleEdit(mate.id)}>
              Edit
            </button>
            <button
              className="button-delete"
              onClick={() => handleDelete(mate.id)}
            >
              Delete
            </button>
          </div>
        ))}
        {mates.length === 0 && (
          <p className="text-gray-400">No crewmates found. Create one!</p>
        )}
      </div>
    </div>
  );
};

export default CrewmateGallery;
