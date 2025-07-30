import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

const CrewmateList = () => {
  const [mates, setMates] = useState([]);
  const [selectedMate, setSelectedMate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMates = async () => {
      const { data, error } = await supabase.from("Mates").select("*");
      if (error) {
        console.error("Error fetching mates:", error);
      } else {
        setMates(data);
      }
    };
    fetchMates();
  }, []);

  const handleSelect = (mate) => {
    setSelectedMate(mate);
  };

  const handleBack = () => {
    setSelectedMate(null);
  };

  if (selectedMate) {
    return (
      <div className="crewmate-detail-container">
        <h2>{selectedMate.name}</h2>
        <p>
          <strong>Speed:</strong> {selectedMate.speed} mph
        </p>
        <p>
          <strong>Color:</strong> {selectedMate.color}
        </p>

        <button onClick={() => navigate(`/edit/${selectedMate.id}`)}>
          Edit Crewmate
        </button>
        <button onClick={handleBack} style={{ marginLeft: "1em" }}>
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="crewmate-list-container">
      <h1>All Crewmates</h1>
      <div className="mate-list">
        {mates.map((mate) => (
          <div
            key={mate.id}
            className="mate-card"
            onClick={() => handleSelect(mate)}
          >
            <h2>{mate.name}</h2>
            <p>Speed: {mate.speed} mph</p>
            <p>Color: {mate.color}</p>
          </div>
        ))}
        {mates.length === 0 && <p>No crewmates found. Try creating one!</p>}
      </div>
    </div>
  );
};

export default CrewmateList;
