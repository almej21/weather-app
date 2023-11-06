import Navbar from "navbar/Navbar.js";
import Favorites from "pages/favorites/Favorites.js";
import Weather from "pages/weather/Weather.js";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/weather" element={<Weather />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
