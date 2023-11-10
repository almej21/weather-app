import { createContext, useContext, useEffect, useState } from "react";
import * as LocalStorage from "utils/localStorage";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [favoritesArray, setFavoritesArray] = useState([]);
  const [selectedCityWeatherObj, setSelectedCityWeatherObj] = useState({
    locationKey: "",
    favorite: false,
    city: "",
    temp: "",
    weather: "",
    citiesArray: [],
  });

  useEffect(() => {
    if (LocalStorage.get("favorite-cities")) {
      setFavoritesArray(LocalStorage.get("favorite-cities"));
    }
  }, []);

  useEffect(() => {
    if (favoritesArray != null && favoritesArray.length > 0) {
      const keyValueArrayString = JSON.stringify(favoritesArray);

      localStorage.setItem("favorite-cities", keyValueArrayString);
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
