import { AppState } from "context/AppProvider";
import "./favorites.scss";

const Favorites = () => {
  const { favoritesArray } = AppState();
  return (
    <div className="favorites-page">
      {favoritesArray.length === 0 && <h1>no favorites</h1>}
      {favoritesArray.map((item, index) => {
        return (
          <div key={index} className="favorite-city">
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
