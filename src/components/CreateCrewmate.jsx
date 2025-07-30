import "./CreateCrewmate.css";
import { useState } from "react";
import { supabase } from "../client";

const CreateCrewmate = () => {
  const [mates, setMates] = useState({
    name: "",
    speed: "",
    color: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMates((prevMates) => ({
      ...prevMates,
      [name]: value,
    }));
  };

  const createMates = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from("Mates")
      .insert({
        name: mates.name,
        speed: mates.speed,
        color: mates.color,
      })
      .select();

    if (error) {
      console.error("Error creating Mates:", error.message);
    } else {
      console.log("Post created:", data);
      window.location = "/gallery"; // Redirect after creation
    }
  };

  return (
    <div className="crewmate-container">
      <h1 className="crewmate-title">Create a New Crewmate</h1>
      <img
        src="https://cdn.pixabay.com/photo/2021/06/17/15/04/impostor-6343737_1280.png"
        alt="Crewmates"
        className="crewmate-image"
      />

      <form onSubmit={createMates}>
        <div className="form-sections">
          <div className="form-card">
            <h2 className="form-label">Name:</h2>
            <input
              type="text"
              name="name"
              value={mates.name}
              onChange={handleChange}
              placeholder="Enter crewmate's name"
              className="form-input"
              required
            />
          </div>

          <div className="form-card">
            <h2 className="form-label">Speed (mph):</h2>
            <input
              type="number"
              name="speed"
              value={mates.speed}
              onChange={handleChange}
              placeholder="Enter speed in mph"
              className="form-input"
              required
            />
          </div>

          <div className="form-card">
            <h2 className="form-label">Color:</h2>
            <div className="color-options">
              {[
                "Red",
                "Green",
                "Blue",
                "Purple",
                "Yellow",
                "Orange",
                "Pink",
                "Rainbow",
              ].map((color) => (
                <label key={color} className="radio-option">
                  <input
                    type="radio"
                    name="color"
                    value={color.toLowerCase()}
                    checked={mates.color === color.toLowerCase()}
                    onChange={handleChange}
                    required
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>
        </div>
        <br></br>

        <button type="submit" className="submit-button">
          Create Crewmate
        </button>
      </form>
    </div>
  );
};

export default CreateCrewmate;
