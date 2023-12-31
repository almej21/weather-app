import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { AppState } from "context/AppProvider";
import {
  addToFavorites,
  removeFromFavorites,
} from "features/favorites/favoritesSlice";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as LocalStorage from "utils/localStorage";
import * as ServerApi from "utils/serverApi";

import { useLocation } from "react-router-dom";
import "./weather.scss";

function getDayName(timestamp) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(timestamp);
  const dayIndex = date.getUTCDay();

  return daysOfWeek[dayIndex];
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const containsSameKeyValue = (arrayOfObjects, objToCheck) => {
  // Iterate through the array of objects
  for (const obj of arrayOfObjects) {
    // Check if every key-value pair in objToCheck is present in the current object
    if (
      Object.entries(objToCheck).every(([key, value]) => obj[key] === value)
    ) {
      return true; // Found a matching object
    }
  }

  // No matching object found
  return false;
};

export default function Weather() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [citiesAutoComplete, setCitiesAutoComplete] = useState([]);

  const [toast, setToast] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { open } = toast;

  const [selectedSearchValue, setSelectedSearchValue] = useState({
    label: "",
    locationKey: "",
  });

  const {
    favoritesArray,
    setFavoritesArray,
    selectedCityWeatherObj,
    setSelectedCityWeatherObj,
  } = AppState();

  const handleChange = (event) => {
    const searchValue = event.target.value;
    if (searchValue.length > 2) {
      location.state.cityLabel = searchValue;

      ServerApi.fetchCitiesAutoComplete(searchValue)
        .then((cities) => {
          setCitiesAutoComplete(cities);
        })
        .catch(() => {
          console.log("error fetching");
        });
    }
  };

  const handleSelect = (event, newValue, reason) => {
    if (reason === "clear") return;
    const newCityObj = {
      label: newValue.label,
      locationKey: newValue.locationKey,
    };
    location.state.cityLabel = newCityObj.label;
    location.state.locationKey = newCityObj.locationKey;

    LocalStorage.set("last_selected_city_label", newCityObj.label);
    LocalStorage.set("last_selected_city_key", newCityObj.locationKey);
    setSelectedSearchValue(newCityObj);
  };

  useEffect(() => {
    let locationKey, cityLabel;
    if (location.state !== null) {
      locationKey = location.state.locationKey;
      cityLabel = location.state.cityLabel;
    }
    var key = selectedSearchValue.locationKey;

    // if we're coming from the favorites page than display the city clicked
    if (locationKey) {
      Promise.all([
        ServerApi.fetchWeatherByCity(locationKey),
        ServerApi.fetchFiveDays(locationKey),
      ])
        .then((data) => {
          const obj = {
            city: cityLabel,
          };

          const cityExists = containsSameKeyValue(favoritesArray, obj);

          const daysWeatherArr = data[1].DailyForecasts.map((item) => ({
            day: getDayName(item.Date),
            minTemp: item.Temperature.Minimum.Value,
            maxTemp: item.Temperature.Maximum.Value,
          }));

          const weatherData = {
            locationKey: locationKey,
            favorite: cityExists,
            city: cityLabel,
            temp: data[0].Temperature.Metric.Value,
            weather: data[0].WeatherText,
            daysArray: daysWeatherArr,
          };

          setSelectedCityWeatherObj(weatherData);
        })
        .catch((err) => {
          console.log("error fetching data");
        });
      return;
    }

    // if we are not from the city page, than display the city that was searched and selected.
    if (LocalStorage.get("last_selected_city_label")) {
      let lastSelectedCityKey = LocalStorage.get("last_selected_city_key");
      let lastSelectedCityLabel = LocalStorage.get("last_selected_city_label");

      Promise.all([
        ServerApi.fetchWeatherByCity(lastSelectedCityKey),
        ServerApi.fetchFiveDays(lastSelectedCityKey),
      ])
        .then((data) => {
          const obj = {
            city: lastSelectedCityLabel,
          };

          const cityExists = containsSameKeyValue(favoritesArray, obj);

          const daysWeatherArr = data[1].DailyForecasts.map((item) => ({
            day: getDayName(item.Date),
            minTemp: item.Temperature.Minimum.Value,
            maxTemp: item.Temperature.Maximum.Value,
          }));

          const weatherData = {
            locationKey: lastSelectedCityKey,
            favorite: cityExists,
            city: lastSelectedCityLabel,
            temp: data[0].Temperature.Metric.Value,
            weather: data[0].WeatherText,
            daysArray: daysWeatherArr,
          };

          setSelectedCityWeatherObj(weatherData);
        })
        .catch((err) => {
          console.log("error fetching data");
        });
    } else {
      // this case is when the user never selected a city.
      if (key === "") {
        key = "215854"; //tel aviv key
        const default_city = "Tel Aviv"; //tel aviv key
      }
      Promise.all([
        ServerApi.fetchWeatherByCity(key),
        ServerApi.fetchFiveDays(key),
      ])
        .then((data) => {
          const obj = {
            city: default_city,
          };
          const cityExists = containsSameKeyValue(
            LocalStorage.get("favorite-cities"),
            obj
          );

          const daysWeatherArr = data[1].DailyForecasts.map((item) => ({
            day: getDayName(item.Date),
            minTemp: item.Temperature.Minimum.Value,
            maxTemp: item.Temperature.Maximum.Value,
          }));

          const weatherData = {
            locationKey: key,
            favorite: cityExists,
            city: default_city,
            temp: data[0].Temperature.Metric.Value,
            weather: data[0].WeatherText,
            daysArray: daysWeatherArr,
          };
          setSelectedCityWeatherObj(weatherData);
        })
        .catch((err) => {
          console.log("error fetching data");
        });
    }
    // api call for current weather
  }, [selectedSearchValue]);

  const handleAddFavorite = () => {
    setToast({ ...toast, open: true });
    setSelectedCityWeatherObj({ ...selectedCityWeatherObj, favorite: true });

    dispatch(addToFavorites({ ...selectedCityWeatherObj, favorite: true }));

    const cityExists = favoritesArray.some(
      (city) => JSON.stringify(city) === JSON.stringify(selectedCityWeatherObj)
    );
    if (!cityExists) {
      setFavoritesArray([...favoritesArray, selectedCityWeatherObj]);
    }
  };

  const handleRemoveFavorite = () => {
    setSelectedCityWeatherObj({ ...selectedCityWeatherObj, favorite: false });

    dispatch(removeFromFavorites(selectedCityWeatherObj));

    const updatedArray = favoritesArray.filter(
      (obj) => obj.city !== selectedCityWeatherObj.city
    );

    LocalStorage.set("favorite-cities", updatedArray);

    setFavoritesArray(updatedArray);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast(false);
  };

  const handleCloseWindow = (event) => {
    const emptyObj = {
      city: "",
      temp: "",
      weather: "",
      daysArray: [],
    };
    setSelectedCityWeatherObj(emptyObj);
  };

  return (
    <div className="weather-page">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={citiesAutoComplete}
        sx={{ width: 300 }}
        value={selectedSearchValue.label}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            className="input-search"
            label="Search"
            variant="outlined"
            fullWidth
            value={selectedSearchValue.label}
            onChange={handleChange}
          />
        )}
      />
      {selectedCityWeatherObj.city !== "" && (
        <div className="city-weather-container">
          <CloseIcon className="close" onClick={handleCloseWindow} />
          <div className="city-weather-add-favorites">
            <div className="city-name-temp">
              <h2>{selectedCityWeatherObj.city}</h2>
              <h2>{selectedCityWeatherObj.temp}°c</h2>
            </div>
            <div>
              {selectedCityWeatherObj.favorite ? (
                <div
                  className="favorite-btn remove"
                  onClick={handleRemoveFavorite}
                >
                  <RemoveCircleIcon />
                  remove from favorites
                </div>
              ) : (
                <div className="favorite-btn add" onClick={handleAddFavorite}>
                  <FavoriteBorderIcon />
                  add to favorites
                </div>
              )}
            </div>
          </div>
          <h1>{selectedCityWeatherObj.weather}</h1>
          <div className="days">
            {selectedCityWeatherObj.daysArray.map((dayItem, index) => {
              return (
                <div key={index} className="day-weather">
                  <h3>{dayItem.day}</h3>
                  <h3>
                    {dayItem.minTemp}°c-{dayItem.maxTemp}°c
                  </h3>
                </div>
              );
            })}
          </div>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleCloseToast}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseToast}
              severity="success"
              sx={{ width: "100%" }}
            >
              saved to favorites!
            </Alert>
          </Snackbar>
        </div>
      )}
    </div>
  );
}
