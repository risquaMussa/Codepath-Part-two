import "./App.css";
import CoinList from "./components/CoinList";
import SearchBar from "./components/SearchBar";

//const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  return (
    <div className="App">
      <h1 className="text-center text-4xl mb-8 font-bold text-white">
        My Crypto List
      </h1>
      <SearchBar />
      <CoinList />
    </div>
  );
}

export default App;
