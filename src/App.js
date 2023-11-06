import AppProvider from "context/AppProvider.js";
import Navbar from "navbar/Navbar.js";
import Favorites from "pages/favorites/Favorites.js";

import Weather from "pages/weather/Weather.js";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Weather />} index />
          <Route path="/" element={<Weather />} index />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
