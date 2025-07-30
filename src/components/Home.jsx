import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-gray-900 text-white p-10 overflow-auto">
      <h1 className="text-5xl font-bold mb-6">
        Welcome to the Crewmate Creator!
      </h1>
      <p className="text-gray-400 mb-6">
        Here is where you can create your very own set of crewmates before
        sending them off into space!
      </p>
      <img
        src="https://cdn.pixabay.com/photo/2021/06/17/15/04/impostor-6343737_1280.png"
        alt="Crewmate"
        className="w-64 h-auto rounded-lg shadow-lg mx-auto mb-6"
      />
      <button
        onClick={() => navigate("/list")}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Go to the List of Crewmates
      </button>
    </div>
  );
};

export default Home;
