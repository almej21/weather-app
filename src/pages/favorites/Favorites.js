import { AppState } from "context/AppProvider";
import { useNavigate } from "react-router-dom";
import "./favorites.scss";

const Favorites = () => {
  const navigate = useNavigate();

  const { favoritesArray, setSelectedCityWeatherObj } = AppState();

  const handleCityClick = (item) => {
    navigate(`/home/${item.city}`, {
      state: { locationKey: item.locationKey, cityLabel: item.city },
    });
    const emptyObj = {
      city: "",
      temp: "",
      weather: "",
      daysArray: [],
    };
    setSelectedCityWeatherObj(emptyObj);
  };

  return (
    <div className="favorites-page">
      {favoritesArray.length === 0 && <h1>no favorites</h1>}
      {favoritesArray.map((item, index) => {
        return (
          <div
            key={index}
            className="favorite-city"
            onClick={() => {
              handleCityClick(item);
            }}
          >
            <h2>{`${item.city}`}</h2>
            <h2>{`${item.temp}°c`}</h2>
            <h2>{`${item.weather}`}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
