import { createContext, useContext, useEffect, useState } from "react";
import * as LocalStorage from "utils/localStorage";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [favoritesArray, setFavoritesArray] = useState([]);
  const [selectedCityWeatherObj, setSelectedCityWeatherObj] = useState({
    locationKey: "",
    city: "",
    temp: "",
    weather: "",
    daysArray: [],
  });
  const [mode, setMode] = useState("light");

  useEffect(() => {
    if (LocalStorage.get("favorite-days")) {
      console.log(LocalStorage.get("favorite-days"));
      setFavoritesArray(LocalStorage.get("favorite-days"));
    }
  }, []);

  useEffect(() => {
    if (favoritesArray != null && favoritesArray.length > 0) {
      const keyValueArrayString = JSON.stringify(favoritesArray);

      localStorage.setItem("favorite-days", keyValueArrayString);
    }
  }, [favoritesArray]);

  return (
    <AppContext.Provider
      value={{
        favoritesArray,
        setFavoritesArray,
        selectedCityWeatherObj,
        setSelectedCityWeatherObj,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppState = () => {
  return useContext(AppContext);
};

export default AppProvider;
